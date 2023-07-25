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
      firstName: 'Sam',
      lastName: 'Sully',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'markbrown@user.io',
      username: 'MarkBrown1',
      firstName: 'Mark',
      lastName: 'Brown',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'djones@user.io',
      username: 'DanJones',
      firstName: 'Daniel',
      lastName: 'Jones',
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
      email: 'sallystone@user.io',
      username: 'SallyStone123',
      firstName: 'Sally',
      lastName: 'Stone',
      hashedPassword: bcrypt.hashSync('password5')
    },
    {
      email: 'johnsmith@user.io',
      username: 'JohnnyS',
      firstName: 'John',
      lastName: 'Smith',
      hashedPassword: bcrypt.hashSync('password4')
    },
    {
      email: 'benstone@user.io',
      username: 'Benny',
      firstName: 'Ben',
      lastName: 'Stone',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'sarajohnson@user.io',
      username: 'SaraJ',
      firstName: 'Sara',
      lastName: 'Johnson',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'alexj@user.io',
      username: 'AlexJ',
      firstName: 'Alex',
      lastName: 'James',
      hashedPassword: bcrypt.hashSync('password4')
    },
    {
      email: 'larry@user.io',
      username: 'LarryDemo',
      firstName: 'Larry',
      lastName: 'Carpenter',
      hashedPassword: bcrypt.hashSync('password4')
    },
    {
      email: 'jguzman@user.io',
      username: 'JGuz',
      firstName: 'Javier',
      lastName: 'Guzman',
      hashedPassword: bcrypt.hashSync('password4')
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
      username: {[Op.in]: ['Demo-lition', 'MarkBrown1', 'SallyStone123', 'FakeUser1', 'DanJones', 'SallySally', 'JohnnyS', 'Benny', 'SaraJ', 'AlexJ', 'LarryDemo', 'JGuz']}
    }, {});
  }
};
