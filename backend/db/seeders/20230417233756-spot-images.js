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
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage1.1.jpg',
      preview: true,
    },
    {
      spotId: 1,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage1.2.jpeg',
      preview: false,
    },
    {
      spotId: 1,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage1.3.jpeg',
      preview: false,
    },
    {
      spotId: 1,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage1.5.jpeg',
      preview: false,
    },
    {
      spotId: 1,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage1.4.jpg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage2.1.jpg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage2.2.jpg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage2.3.jpg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage2.4.jpg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage2.5.jpg',
      preview: false,
    },
    {
      spotId: 3,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage3.1.jpg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage3.2.jpg',
      preview: false,
    },
    {
      spotId: 3,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage3.3.jpg',
      preview: false,
    },
    {
      spotId: 3,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage3.4.jpg',
      preview: false,
    },
    {
      spotId: 3,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage3.5.jpg',
      preview: false,
    },
    {
      spotId: 4,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage4.1.jpg',
      preview: true,
    },
    {
      spotId: 4,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage4.2.jpg',
      preview: false,
    },
    {
      spotId: 4,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage4.3.jpg',
      preview: false,
    },
    {
      spotId: 4,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage4.4.jpg',
      preview: false,
    },
    {
      spotId: 4,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage4.5.jpeg',
      preview: false,
    },
    {
      spotId: 5,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage5.1.jpg',
      preview: true,
    },
    {
      spotId: 5,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage5.2.png',
      preview: false,
    },
    {
      spotId: 5,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage5.3.jpg',
      preview: false,
    },
    {
      spotId: 5,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage5.4.png',
      preview: false,
    },
    {
      spotId: 5,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage5.5.jpg',
      preview: false,
    },
    {
      spotId: 6,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage6.1.jpg',
      preview: true,
    },
    {
      spotId: 6,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage6.2.jpg',
      preview: false,
    },
    {
      spotId: 6,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage6.3.jpg',
      preview: false,
    },
    {
      spotId: 6,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage6.4.jpg',
      preview: false,
    },
    // {
    //   spotId: 6,
    //   url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage6.5.webp',
    //   preview: false,
    // },
    {
      spotId: 7,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage7.1.jpg',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage7.2.jpg',
      preview: false,
    },
    {
      spotId: 7,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage7.3.jpg',
      preview: false,
    },
    {
      spotId: 7,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage7.4.jpg',
      preview: false,
    },
    // {
    //   spotId: 7,
    //   url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage7.5.webp',
    //   preview: false,
    // },
    {
      spotId: 8,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage8.1.jpg',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage8.2.jpg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage8.3.jpg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage8.4.jpg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage8.5.jpg',
      preview: false,
    },
    {
      spotId: 9,
      url: "https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage9.1.jpg",
      preview: true
    },
    {
      spotId: 9,
      url: "https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage9.2.jpg",
      preview: true
    },
    {
      spotId: 9,
      url: "https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage9.3.jpg",
      preview: true
    },
    {
      spotId: 9,
      url: "https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage9.4.png",
      preview: true
    },
    {
      spotId: 9,
      url: "https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage9.5.jpg",
      preview: true
    },
    {
      spotId: 10,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage10.1.jpg',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage10.2.jpg',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage10.3.jpg',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage10.4.jpg',
      preview: true,
    },
    {
      spotId: 10,
      url: 'https://spnotify.s3.us-east-2.amazonaws.com/notbnbimage10.5.jpg',
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
