const models = require('../../models')
const {getUserFromToken} = require('./userTokenService')

class TreasureService {
    static async getNearTreasure(req, res) {
        const treasures = models.Treasures.getNearTreasure(req.body.longitude, req.body.latitude, req.body.distance)
        this.getAllTreasures(treasures, req, res)
    }

    static getAllTreasures(treasures, req, res) {
        treasures
          .then(result => {
            return req.body.prize_value != undefined
              ? this.findTreasuresByPrize(result, req, res)
              : this.findTreasureList(result, res);
          })
          .catch(error => {
            console.log(error, 'error');
            res.sendStatus(400);
          });
    }

    static findTreasuresByPrize(result, req, res) {
      if (result === null) {
        res.sendStatus(404);
      } else {
        const allTreasures = Object.values(result);
        const allTreasuresIds = [];
        allTreasures.map(treasure => {
          allTreasuresIds.push(treasure.id);
        });
        const allTreasureByPrice = models.Treasures.getTreasureByPrice(
          allTreasuresIds,
          req.body.prize_value
        );
        allTreasureByPrice
          .then(treasurePrice => {
            if (treasurePrice === null) {
              res.sendStatus(404);
            } else {
              const treasuresListIdsP = [];
              const treasuresListP = Object.values(treasurePrice);
              treasuresListP.map(treasureId => {
                treasuresListIdsP.push(treasureId.treasure_id);
              });
  
              const filtertreasuresList = allTreasures.filter(treasure => {
                const searchIndex = treasuresListIdsP.indexOf(treasure.id);
                if (searchIndex > -1) {
                  treasure.distance = treasure.distance.toFixed(2);
                  treasure.amount = treasuresListP[searchIndex].amt;
                  return treasure;
                }
              });
              res.status(200).json({
                total: filtertreasuresList.length,
                data: filtertreasuresList
              });
            }
          })
          .catch(error => {
            res.sendStatus(400);
          });
      }
    }

    static findTreasureList(result, res) {
      const allTreasures = Object.values(result);
      allTreasures.map(treasure => {
        treasure.distance = treasure.distance.toFixed(2);
      });
      res.status(200).json({
        total: allTreasures.length,
        data: allTreasures
      });
    }

    static async claimTreasure(req, res) {
      const {id, prize_value} = req.body
      const moneyValue =models.MoneyValue.getMoneyValue(
        id,
        prize_value
      );
      moneyValue
        .then(result => {
          if (result === null) {
            throw new Error("No Treasure Found");
          }
          console.log(result, 'result');
          return this.claimPrize(req, res, result.id);
        })
        .then(claimResult => {
          const isError = claimResult instanceof Error;
  
          if (isError === true) {
            throw new Error("No Treasure Exist");
          } else {
            res.json({ message: "Treasure claimed successfully!" });
          }
        })
        .catch(error => {
          if (error.message === "No Treasure Exist") {
            res.json({
              message: "Treasure is not available to claim with this prize value!"
            });
          } else {
            res.json({ message: "You have claimed this treasure!" });
          }
        });
    }

    static claimPrize(req, res, id) {
      const userFromToken = getUserFromToken(req);
      return models.UserTreasures.claimPrize(
        userFromToken.id,
        id,
        req.body.prize_value
      );
    }
}

module.exports = TreasureService;