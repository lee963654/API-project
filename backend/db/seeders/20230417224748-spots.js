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
    options.tableName = "Spots";
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '12338 Main Ave',
        city: "Trenton",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name1',
        description: 'abcd',
        price: 5055
      },
      {
        ownerId: 1,
        address: '1234 Preston Ave',
        city: "Newark",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name2',
        description: 'abcd',
        price: 5005
      },
      {
        ownerId: 2,
        address: '1 Valley Road',
        city: "New Brunswick",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name3',
        description: 'abcd',
        price: 500000
      },
      {
        ownerId: 2,
        address: '2 Main Ave',
        city: "Wayne",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name4',
        description: 'abcd',
        price: 5000
      },
      {
        ownerId: 2,
        address: '87 Perry Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name5',
        description: 'abcd',
        price: 500
      },
      {
        ownerId: 2,
        address: '31 Wallow Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name6',
        description: 'abcd',
        price: 500
      },
      {
        ownerId: 3,
        address: '46 Easton Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name7',
        description: 'abcd',
        price: 500
      },
      {
        ownerId: 4,
        address: '95 North Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name8',
        description: 'abcd',
        price: 500
      },
      {
        ownerId: 4,
        address: '6 South Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name9',
        description: 'abcd',
        price: 500
      },
      {
        ownerId: 5,
        address: '35 Broad Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        lat: 54.241,
        lng: 43.555,
        name: 'name10',
        description: 'abcd',
        price: 500
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
    options.tableName = "Spots"
    await queryInterface.bulkDelete(options)
  }
};