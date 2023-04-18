'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = "Spot-Images";
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'www.new.org',
      preview: true,
    },
    {
      spotId: 2,
      url: 'www.new1.org',
      preview: true,
    },
    {
      spotId: 3,
      url: 'www.new2.org',
      preview: false,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spot-Images";
    await queryInterface.bulkDelete(options)
  }
};
