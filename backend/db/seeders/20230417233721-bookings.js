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
      startDate: '2023/06/20',
      endDate: '2023/06/20',
    },
    {
      spotId: 1,
      userId: 2,
      startDate: '2023/07/20',
      endDate: '2023/07/20',
    },
    {
      spotId: 4,
      userId: 3,
      startDate: '2023/08/20',
      endDate: '2023/08/20',
    },
    {
      spotId: 2,
      userId: 4,
      startDate: '2023/09/20',
      endDate: '2023/09/20',
    }
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
