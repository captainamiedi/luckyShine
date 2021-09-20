'use strict';
const moneyValue = require("../data/money_values.json");
const todayDate = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     moneyValue.map(value => {
      moneyValue.createdAt = value.updatedAt = todayDate;
    });

    await queryInterface.bulkInsert("money_values",moneyValue,{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete("money_values", null, {});
  }
};
