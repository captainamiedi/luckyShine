'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoneyValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MoneyValue.belongsTo(models.Treasures, {
        foreignKey: 'treasure_id'
      })

      MoneyValue.hasMany(models.UserTreasures)
    }

    static async getMoneyValue(treasureId, amount) {
      const money =await MoneyValue.findOne({
        where: {
          treasure_id: treasureId,
          amount: amount
        }
      });
      return money;
  }
  };
  MoneyValue.init({
    treasure_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'money_values',
    modelName: 'MoneyValue',
    timestamps: true
  });
  return MoneyValue;
};