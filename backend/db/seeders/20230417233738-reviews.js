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
   options.tableName = "Reviews";
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 4,
      review: 'Great place to stay and great host. Room was comfortable and with beautiful interior design. Highly recommended.',
      stars: 4,
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Great stay!. Very polite and welcoming hosts to have in the house. looks the same as in the pics. extremely quiet too. A lovely experience in all!',
      stars: 3,
    },
    {
      spotId: 3,
      userId: 1,
      review: 'Very friendly hosts! Beautiful house. Thank you for letting me stay at your place.',
      stars: 5,
    },
    {
      spotId: 4,
      userId: 1,
      review: 'Beautiful home and welcoming space. The most important part of any stay for me is my sleep and the house was quiet and the bed was SO comfortable. Would definitely stay again.',
      stars: 1,
    },
    {
      spotId: 4,
      userId: 3,
      review: 'Your welcome to Christi-Anna place. The place is well indicated for your stay if you are looking for a quite place, clean and secure place where to sleep. I will go back there again if still available.',
      stars: 1,
    },
    {
      spotId: 8,
      userId: 3,
      review: 'Christi-Anna and her husband were very friendly hosts. The room is nice, the shower is good, the washing machine/dryer are new and the kitchen has a large counter for those that like to cook. A Bodum French press is also provided for coffee brewing.',
      stars: 2,
    },
    {
      spotId: 4,
      userId: 4,
      review: 'Everything was super! I recommend this apartment in Milan! Special thanks to Valentina for your hospitality!',
      stars: 0,
    },
    {
      spotId: 6,
      userId: 5,
      review: 'It was a good stay, with a little issue with other guests that was promptly resolved with the host, very prompt!',
      stars: 3,
    },
    {
      spotId: 5,
      userId: 2,
      review: 'Wonderful room, and lovely hosts. Would definitely consider revisiting!',
      stars: 3,
    },
    {
      spotId: 8,
      userId: 5,
      review: 'Michelle & Micheal made us feel very welcome and were very helpful during our stay. The accommodation was beautiful and had a lot of very nice little touches. Would definitely come back',
      stars: 4,
    },
    {
      spotId: 7,
      userId: 4,
      review: 'It was a wonderful short stay, the place is very peaceful and beautifully decorated. Michael was very helpful and responsive, even offered to drop us off at the train station. Thank you for the wonderful experience!',
      stars: 5,
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
    options.tableName = "Reviews";
    await queryInterface.bulkDelete(options)
  }
};
