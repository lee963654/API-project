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
        address: '1234 Main Ave',
        city: "Trenton",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name1',
        description: 'abcd',
        price: 5005
      },
      {
        ownerId: 2,
        address: '123 Main Ave',
        city: "Trenton",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name1',
        description: 'abcd',
        price: 500000
      },
      {
        ownerId: 3,
        address: '123 Main Ave',
        city: "Trenton",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name1',
        description: 'abcd',
        price: 5000
      },
      {
        ownerId: 4,
        address: '123 Main Ave',
        city: "Trenton",
        state: 'New Jersey',
        country: 'USA',
        lat: 50,
        lng: 40,
        name: 'name1',
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
