'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTreasures extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserTreasures.belongsTo(models.users, {
        foreignKey: 'user_id'
      })
      UserTreasures.belongsTo(models.MoneyValue, {
        foreignKey: 'money_value_id'
      })
    }

    static claimPrize(userId, moneyValueId, amount) {
      return UserTreasures.create({
        user_id: userId,
        money_value_id: moneyValueId,
        amount
      })
    }
  };
  UserTreasures.init({
    user_id: DataTypes.INTEGER,
    money_value_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'user_treasures',
    modelName: 'UserTreasures'
  });
  return UserTreasures;
};