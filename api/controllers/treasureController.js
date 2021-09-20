const treasureService = require('../services/treasuresService')

module.exports = {
    getTreasure(req, res) {
        console.log(req.body, 'body')
        return treasureService.getNearTreasure(req, res)
    },

    claimTreasureController (req, res) {
        return treasureService.claimTreasure(req, res)
    }
}