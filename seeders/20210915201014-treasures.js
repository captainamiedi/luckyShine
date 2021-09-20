'use strict';

const treasures = require("../data/treasures.json");
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
     treasures.map(treasure => {
      treasure.createdAt = treasure.updatedAt = todayDate;
    });

    await queryInterface.bulkInsert("treasures", treasures, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete("treasures", null, {});
  }
};
