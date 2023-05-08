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
   options.tableName = "SpotImages";
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://i.imgur.com/6PAP9Of.jpeg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/g3zN0Dq.jpeg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/8Fp7b72.jpeg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/tCqGQhj.jpeg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/N5GoyFl.jpeg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/maaIzQ7.jpeg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/f1us1v3.jpeg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/dJrtWu8.jpeg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/S9EQGZH.jpeg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/3K9VTea.jpeg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/5SbNY3v.jpeg',
      preview: true,
    },
    {
      spotId: 4,
      url: 'https://i.imgur.com/6PAP9Of.jpeg',
      preview: true,
    },
    {
      spotId: 5,
      url: 'https://i.imgur.com/tgjhiBW.jpeg',
      preview: true,
    },
    {
      spotId: 6,
      url: 'https://i.imgur.com/RfbyX4m.jpeg',
      preview: true,
    },
    {
      spotId: 6,
      url: 'https://i.imgur.com/joGjlLF.jpeg',
      preview: true,
    },
    {
      spotId: 6,
      url: 'https://i.imgur.com/PZaPKDa.jpeg',
      preview: false,
    },
    {
      spotId: 7,
      url: 'https://i.imgur.com/iimiVyE.jpeg',
      preview: false,
    },
    {
      spotId: 7,
      url: 'https://i.imgur.com/HdYhJ9b.jpeg',
      preview: false,
    },
    {
      spotId: 7,
      url: 'https://i.imgur.com/po7ZyiF.jpeg',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://i.imgur.com/lv6dMZG.jpeg',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/XHHEDFW.jpeg',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/40jI1jU.jpeg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/tKgPeBb.jpeg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/EwVp3Ot.jpeg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/nXvg72H.jpeg',
      preview: true,
    },
    {
      spotId: 9,
      url: "https://as1.ftcdn.net/v2/jpg/00/06/31/10/1000_F_6311088_HNXoesQXuLgOYbc7KyRyb9veUtWvUfFc.jpg",
      preview: true
    },
    {
      spotId: 10,
      url: 'https://previews.123rf.com/images/bialasiewicz/bialasiewicz1309/bialasiewicz130900493/22296180-view-of-the-facade-of-a-fabulous-mansion.jpg',
      preview: true,
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
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options)
  }
};
