'use strict';

const bcrypt = require("bcryptjs");

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
   options.tableName = "Users";
   await queryInterface.bulkInsert(options, [
    {
      email: 'demo@user.io',
      username: 'Demo-lition',
      firstName: 'demoName1',
      lastName: 'demoName2',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user111111@user.io',
      username: 'FakeUser1',
      firstName: 'demoName11',
      lastName: 'demoName22',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'user22222@user.io',
      username: 'FakeUser2',
      firstName: 'demoName111',
      lastName: 'demoName222',
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
      email: 'usertest@user.io',
      username: 'FakeUser3',
      firstName: 'demoName1111',
      lastName: 'demoName2222',
      hashedPassword: bcrypt.hashSync('passwordpassword')
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Users"
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      username: {[Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3']}
    }, {});
  }
};
