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
   options.tableName = "Bookings";
   await queryInterface.bulkInsert(options, [
    {
      spotId: 2,
      userId: 1,
      startDate: '2023-06-20',
      endDate: '2023-06-21',
    },
    {
      spotId: 1,
      userId: 2,
      startDate: '2023-07-20',
      endDate: '2023-07-22',
    },
    {
      spotId: 4,
      userId: 3,
      startDate: '2023-08-20',
      endDate: '2023-08-23',
    },
    {
      spotId: 2,
      userId: 4,
      startDate: '2023-09-20',
      endDate: '2023-09-24',
    },
    {
      spotId: 2,
      userId: 5,
      startDate: '2023-09-29',
      endDate: '2023-09-30',
    },
    {
      spotId: 8,
      userId: 1,
      startDate: '2023-10-20',
      endDate: '2023-10-24',
    },
    {
      spotId: 7,
      userId: 2,
      startDate: '2023-10-20',
      endDate: '2023-10-24',
    },
    {
      spotId: 6,
      userId: 3,
      startDate: '2023-10-20',
      endDate: '2023-10-24',
    },
    {
      spotId: 6,
      userId: 3,
      startDate: '2020-10-20',
      endDate: '2020-10-24',
    },
    {
      spotId: 9,
      userId: 1,
      startDate: '2020-10-20',
      endDate: '2020-10-24',
    },
    {
      spotId: 9,
      userId: 1,
      startDate: '2023-4-15',
      endDate: '2023-5-24',
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
    options.tableName = "Bookings"
    await queryInterface.bulkDelete(options)
  }
};
