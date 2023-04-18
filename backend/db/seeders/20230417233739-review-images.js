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
   options.tableName = "ReviewImages";
   await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'www.new4.org',
    },
    {
      reviewId: 2,
      url: 'www.new45.org',
    },
    {
      reviewId: 3,
      url: 'www.new1.org',
    },
    {
      reviewId: 4,
      url: 'www.new2.org',
    },
    {
      reviewId: 5,
      url: 'www.new3.org',
    },
    {
      reviewId: 6,
      url: 'www.new5.org',
    },
    {
      reviewId: 7,
      url: 'www.new7.org',
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
    options.tableName = "ReviewImages"
    await queryInterface.bulkDelete(options)
  }
};
