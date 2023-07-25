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
      stars: 2,
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
      review: 'Michelle & Micheal made us feel very welcome and were very helpful during our stay. The accommodation was beautiful and had a lot of very nice little touches. Would definitely come back.',
      stars: 4,
    },
    {
      spotId: 7,
      userId: 4,
      review: 'It was a wonderful short stay, the place is very peaceful and beautifully decorated. Michael was very helpful and responsive, even offered to drop us off at the train station. Thank you for the wonderful experience!',
      stars: 5,
    },
    {
      spotId: 1,
      userId: 6,
      review: 'Mistys place was a great escape from the NYC hustle and bustle. We visited the Amish Village and went to a nearby lake that was very peaceful. Great vibes!',
      stars: 5,
    },
    {
      spotId: 1,
      userId: 7,
      review: 'Loved our stay here! Will def be back.',
      stars: 4,
    },
    {
      spotId: 1,
      userId: 8,
      review: 'Great host!',
      stars: 5,
    },
    {
      spotId: 1,
      userId: 9,
      review: 'We had a nice time.',
      stars: 5,
    },
    {
      spotId: 2,
      userId: 6,
      review: 'Extremely cute trailer. genuinely feels like you are in the woods even though you genuinely are walking distance from train. recommend!',
      stars: 1,
    },
    {
      spotId: 2,
      userId: 7,
      review: 'I had such an amazing stay at this beautiful airstream! Its beyond charming and well-kept, with everything I could have needed.',
      stars: 2,
    },
    {
      spotId: 2,
      userId: 8,
      review: 'Rudolf and Sonia were so hospital, they recommended a local event to me and said hello every time I would see them around town!',
      stars: 1,
    },
    {
      spotId: 2,
      userId: 9,
      review: 'While also allowing me privacy, it was great to have the space to myself but know they were there whenever I needed.',
      stars: 3,
    },
    {
      spotId: 2,
      userId: 10,
      review: 'They were also very welcoming to my dog who I brought along.',
      stars: 1,
    },
    {
      spotId: 2,
      userId: 5,
      review: 'I had an incredible time with my friends at this amazing place! It was so cozy and the restroom was clean!',
      stars: 1,
    },
    {
      spotId: 2,
      userId: 4,
      review: 'The host provided us with a warm welcome and showed us great hospitality.',
      stars: 3,
    },
    {
      spotId: 3,
      userId: 6,
      review: 'They were extremely friendly and helpful, making us feel supported throughout our stay.',
      stars: 4,
    },
    {
      spotId: 3,
      userId: 7,
      review: 'When I arrived late and the sky had already darkened, Sonia, one of the hosts, promptly responded to my message and stayed with me until I found the Airstream.',
      stars: 4,
    },
    {
      spotId: 3,
      userId: 8,
      review: ' Additionally, when we faced a problem while cooking at night, Rudolf, another host, replied immediately and came to our aid within 5 minutes!',
      stars: 3,
    },
    {
      spotId: 3,
      userId: 9,
      review: 'On top of that, we unexpectedly met Rudolf in the city after checking out, and he kindly offered us numerous suggestions for places to visit.',
      stars: 5,
    },
    {
      spotId: 4,
      userId: 6,
      review: 'Our experience in Cold Spring was truly fantastic! I highly recommend it to everyone without any hesitation!!!',
      stars: 5,
    },
    {
      spotId: 4,
      userId: 7,
      review: 'We really enjoyed our weekend in Cold Spring!',
      stars: 5,
    },
    {
      spotId: 4,
      userId: 8,
      review: 'Rudolf and Sonia were wonderful hosts.',
      stars: 4,
    },
    {
      spotId: 4,
      userId: 9,
      review: 'They answered a lot of questions before we arrived and were really kind and patient.',
      stars: 5,
    },
    {
      spotId: 4,
      userId: 10,
      review: 'The Airstream was brilliant.',
      stars: 5,
    },
    {
      spotId: 4,
      userId: 5,
      review: 'So much fun. Really well laid out. The bed was super comfortable and it had everything you needed.',
      stars: 4,
    },
    {
      spotId: 5,
      userId: 5,
      review: 'The BBQ, fire pit and hammock outside were excellent additions and Cold Spring itself is a lovely place to visit.',
      stars: 4,
    },
    {
      spotId: 5,
      userId: 6,
      review: 'My wife and I had an awesome time and were able to go to the local boutiques, hike, and spend some quality time together.',
      stars: 3,
    },
    {
      spotId: 5,
      userId: 7,
      review: 'Thank you so much for an awesome stay.',
      stars: 3,
    },
    {
      spotId: 5,
      userId: 8,
      review: 'My husband and two young boys had a wonderful few days at Rudolf and Sonias airstream.',
      stars: 4,
    },
    {
      spotId: 5,
      userId: 9,
      review: 'The location is great, close to everything yet secluded and private.',
      stars: 5,
    },
    {
      spotId: 5,
      userId: 10,
      review: 'The airstream is adorable and filled with so much charm.',
      stars: 5,
    },
    {
      spotId: 6,
      userId: 10,
      review: 'It slept our family of 4 very comfortably, so much so that our kids who are usually up at 6a slept until 8a!',
      stars: 1,
    },
    {
      spotId: 6,
      userId: 9,
      review: 'The airstream had all needed amenities and was organized efficiently for a small space.',
      stars: 1,
    },
    {
      spotId: 6,
      userId: 8,
      review: 'We would definitely like to come back! Thanks for a lovely long weekend.',
      stars: 2,
    },
    {
      spotId: 6,
      userId: 7,
      review: 'Great little place if your looking to hike and explore the area…',
      stars: 1,
    },
    {
      spotId: 6,
      userId: 6,
      review: 'Rudolf and Sonia were great to work with.',
      stars: 3,
    },
    {
      spotId: 7,
      userId: 5,
      review: 'The Airstream is fabulous.',
      stars: 4,
    },
    {
      spotId: 7,
      userId: 6,
      review: 'Its vintage, original features, everything worked.',
      stars: 3,
    },
    {
      spotId: 7,
      userId: 7,
      review: ' If you love vintage Airstreams, this is it.',
      stars: 2,
    },
    {
      spotId: 7,
      userId: 8,
      review: 'The cabinetry, the lighting, the bathroom, all the original knobs for the controls, everything.',
      stars: 2,
    },
    {
      spotId: 7,
      userId: 9,
      review: 'My grandparents had a 1960s Airstream and being here took me right back.',
      stars: 4,
    },
    {
      spotId: 7,
      userId: 10,
      review: 'I cannot say enough nice things about Rudolf and Sonia and their place.',
      stars: 3,
    },
    {
      spotId: 8,
      userId: 10,
      review: 'It was beautifully decorated for a peaceful nature getaway while also having close walking access to town.',
      stars: 4,
    },
    {
      spotId: 8,
      userId: 9,
      review: 'Definitely recommend staying here!',
      stars: 5,
    },
    {
      spotId: 8,
      userId: 8,
      review: 'This is our third time renting this listing, and we are looking forward to coming back soon!',
      stars: 5,
    },
    {
      spotId: 8,
      userId: 7,
      review: 'A wonderful camper close to Cold Spring. ',
      stars: 4,
    },
    {
      spotId: 8,
      userId: 6,
      review: 'Would recommend to anyone looking to spend a few days in the area.',
      stars: 3,
    },
    {
      spotId: 8,
      userId: 3,
      review: 'Had a great stay at the Airstream!',
      stars: 4,
    },
    {
      spotId: 8,
      userId: 4,
      review: 'It was beautiful, comfortable, and had such great communication with the hosts!',
      stars: 3,
    },
    {
      spotId: 9,
      userId: 10,
      review: 'Fun and relaxing.',
      stars: 1,
    },
    {
      spotId: 9,
      userId: 9,
      review: 'Clear house rules, quiet and such a magical time travel!',
      stars: 1,
    },
    {
      spotId: 9,
      userId: 8,
      review: 'The Airsteam is very well taken care of and had alot of old school charm.',
      stars: 2,
    },
    {
      spotId: 10,
      userId: 10,
      review: 'The property was easy to find and walkable to the main street, where resturants and shops are found.',
      stars: 5,
    },
    {
      spotId: 10,
      userId: 9,
      review: 'Would reccomend and also visit again!',
      stars: 5,
    },
    {
      spotId: 10,
      userId: 8,
      review: 'Thanks for such a great stay and communication.',
      stars: 4,
    },
    {
      spotId: 10,
      userId: 7,
      review: 'Had a very relaxing weekend in the most perfect location.',
      stars: 5,
    },
    {
      spotId: 10,
      userId: 6,
      review: 'Trails right off the property and walkable to downtown.',
      stars: 5,
    },
    {
      spotId: 10,
      userId: 5,
      review: 'Its a quiet and peaceful.',
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
