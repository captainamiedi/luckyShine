"use strict";
const { Model, QueryTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Treasures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }

    static async getNearTreasure(
      longitude,
      latitude,
      distance,
      treasureId = false
    ) {
      const treasureIdCondition =
        treasureId !== false ? ` WHERE id = ${treasureId} ` : "";
      const treasures = await sequelize.query(
        `SELECT
            id, name,  (
              6371 * acos (
                cos ( radians($latitude) )
                * cos( radians( latitude ) )
                * cos( radians( longitude ) - radians($longitude) )
                + sin ( radians($latitude) )
                * sin( radians( latitude ) )
              )
            ) AS distance
          FROM treasures
          ${treasureIdCondition}
          HAVING distance < $distance
          ORDER BY distance
          LIMIT 0 , 10`,
        {
          bind: {
            latitude: latitude,
            longitude: longitude,
            distance: distance,
          },
          type: QueryTypes.SELECT,
        }
      );
      return treasures;
    }

    static async getTreasureByPrice(treasures, prizeValue) {
      const treasurePrize = await sequelize.query(
        `SELECT 
        min(amount) as amt, treasure_id 
        FROM money_values 
        WHERE treasure_id in (:treasures) 
        AND amount >= :prize_value
        GROUP by treasure_id
      `,

        {
          replacements: { treasures: treasures, prize_value: prizeValue },
          type: QueryTypes.SELECT,
        }
      );
      return treasurePrize;
    }
  }
  Treasures.init(
    {
      name: DataTypes.STRING,
      latitude: DataTypes.DECIMAL,
      longitude: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Treasures",
      tableName: "treasures",
      timestamps: true,
    }
  );
  return Treasures;
};
