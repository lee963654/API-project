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
      url: 'https://t3.ftcdn.net/jpg/02/66/26/92/360_F_266269223_voOEkuIoS51yrL5G2Lw01OnqQQx9qBUb.jpg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://assets.onepropertee.com/576x441/listing_images/73fa845b-2b49-4bc3-ba18-b08732415c25.pzpXDGRCDtGbozEf8.jpeg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/The_Mansion_.jpg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Dolce_Hayes_Mansion_at_dusk_%28cropped%29.jpg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://www.hayesmansion.com/site/assets/files/4802/san_jose_accommodations.500x500.jpeg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://www.shutterstock.com/image-photo/san-california-september-19-2019-260nw-1553756591.jpg',
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
