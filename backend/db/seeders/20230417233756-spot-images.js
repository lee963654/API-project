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
      url: 'https://i.imgur.com/Ii3vlvZ.jpeg',
      preview: true,
    },
    {
      spotId: 1,
      url: 'https://i.imgur.com/40jI1jU.jpeg',
      preview: false,
    },
    {
      spotId: 1,
      url: 'https://i.imgur.com/EwVp3Ot.jpeg',
      preview: false,
    },
    {
      spotId: 1,
      url: 'https://i.imgur.com/UscGshw.jpeg',
      preview: false,
    },
    {
      spotId: 1,
      url: 'https://i.imgur.com/tKgPeBb.jpeg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/IoabqGc.jpeg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/PjwG0FF.jpeg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/ZZNYlbV.jpeg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/ADKfqzn.jpeg',
      preview: false,
    },
    {
      spotId: 2,
      url: 'https://i.imgur.com/t3f4lJe.jpeg',
      preview: false,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/gowDPRX.jpeg',
      preview: true,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/BS7TY6r.jpeg',
      preview: false,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/yVmeYvq.jpeg',
      preview: false,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/EUSMnp5.jpeg',
      preview: false,
    },
    {
      spotId: 3,
      url: 'https://i.imgur.com/WlrjQ1x.jpeg',
      preview: false,
    },
    {
      spotId: 4,
      url: 'https://i.imgur.com/fDScpcH.jpeg',
      preview: true,
    },
    {
      spotId: 4,
      url: 'https://i.imgur.com/R2acnL2.jpeg',
      preview: false,
    },
    {
      spotId: 4,
      url: 'https://i.imgur.com/HGlM74Z.jpeg',
      preview: false,
    },
    {
      spotId: 4,
      url: 'https://i.imgur.com/ohkCuZQ.jpeg',
      preview: false,
    },
    {
      spotId: 4,
      url: 'https://i.imgur.com/isRq2Lw.jpeg',
      preview: false,
    },
    {
      spotId: 5,
      url: 'https://i.imgur.com/JvUjBTm.jpeg',
      preview: true,
    },
    {
      spotId: 5,
      url: 'https://i.imgur.com/xTZCztE.jpeg',
      preview: false,
    },
    {
      spotId: 5,
      url: 'https://i.imgur.com/lH2DkED.jpeg',
      preview: false,
    },
    {
      spotId: 5,
      url: 'https://i.imgur.com/g9pFCmg.jpeg',
      preview: false,
    },
    {
      spotId: 6,
      url: 'https://i.imgur.com/RfbyX4m.jpeg',
      preview: true,
    },
    {
      spotId: 6,
      url: 'https://i.imgur.com/joGjlLF.jpeg',
      preview: false,
    },
    {
      spotId: 6,
      url: 'https://i.imgur.com/PZaPKDa.jpeg',
      preview: false,
    },
    {
      spotId: 7,
      url: 'https://i.imgur.com/L0QleWh.jpeg',
      preview: true,
    },
    {
      spotId: 7,
      url: 'https://i.imgur.com/FhYQE6C.png',
      preview: false,
    },
    {
      spotId: 7,
      url: 'https://i.imgur.com/dQNS19n.jpeg',
      preview: false,
    },
    {
      spotId: 7,
      url: 'https://i.imgur.com/cNdRpop.jpeg',
      preview: false,
    },
    {
      spotId: 7,
      url: 'https://i.imgur.com/e2Fz7ZI.jpeg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/IoBbLDu.jpeg',
      preview: true,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/2aVDUsD.jpeg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/Q67MFdt.jpeg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/rlEpL0A.jpeg',
      preview: false,
    },
    {
      spotId: 8,
      url: 'https://i.imgur.com/HnMkfOD.jpeg',
      preview: false,
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
