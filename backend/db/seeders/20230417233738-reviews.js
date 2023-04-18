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
   options.tableName = "Reviews";
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 4,
      review: 'Good.',
      stars: 4,
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Good Good.',
      stars: 3,
    },
    {
      spotId: 2,
      userId: 1,
      review: 'Very Good.',
      stars: 5,
    },
    {
      spotId: 3,
      userId: 1,
      review: 'Bad.',
      stars: 1,
    },
    {
      spotId: 4,
      userId: 2,
      review: 'Bad.',
      stars: 1,
    },
    {
      spotId: 4,
      userId: 3,
      review: 'Ehh.',
      stars: 2,
    },
    {
      spotId: 4,
      userId: 4,
      review: 'Bad.',
      stars: 0,
    },
    {
      spotId: 6,
      userId: 5,
      review: 'It was alright.',
      stars: 3,
    },
    {
      spotId: 6,
      userId: 2,
      review: 'Ok.',
      stars: 3,
    },
    {
      spotId: 8,
      userId: 5,
      review: 'Very Good.',
      stars: 4,
    },
    {
      spotId: 7,
      userId: 4,
      review: 'Excellent.',
      stars: 5,
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
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(options)
  }
};
