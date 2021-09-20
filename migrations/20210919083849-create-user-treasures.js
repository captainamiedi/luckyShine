'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_treasures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        unique: "compositeIndex"
      },
      money_value_id: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        unique: "compositeIndex",
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        unique: "compositeIndex"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, 
    {
      uniqueKeys: {
        compositeIndex: {
          customIndex: true,
          fields: ["user_id", "money_value_id", "amount"]
        }
      }
    }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_treasures');
  }
};