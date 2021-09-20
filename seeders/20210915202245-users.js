'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const users = require("../data/users.json");
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

     users.map(user => {
      user.createdAt = user.updatedAt = todayDate;
      user.password = bcrypt.hashSync(user.password, salt);
    });

    await queryInterface.bulkInsert("users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete("users", null, {});
  }
};
