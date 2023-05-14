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
        address: '123 Main Ave',
        city: "Trenton",
        state: 'New Jersey',
        country: 'USA',
        lat: 50.654567845,
        lng: -40.787243453,
        name: 'The Granary, Rustic Modern Barn Conversion',
        description: 'Grade II listed barn conversion with charming spacious double bedroom and ensuite shower room. Located in historic village of Lindfield.',
        price: 370
      },
      {
        ownerId: 1,
        address: '58 Preston Ave',
        city: "Newark",
        state: 'New Jersey',
        country: 'USA',
        lat: 50.7853423453,
        lng: 4.7478373,
        name: 'Cheerful 1-bedroom in a townhouse with parking',
        description: 'This unique place has a style all its own. A very quiet homely house with a modern contemporary style. 25 mins to downtown Ottawa.',
        price: 254
      },
      {
        ownerId: 2,
        address: '1 Valley Road',
        city: "New Brunswick",
        state: 'New Jersey',
        country: 'USA',
        lat: 50.4354,
        lng: 40.873,
        name: 'Stuart Manor Bed and Breakfast',
        description: 'Welcome to Stuart Manor, a mid-1800s Brick Italianate Home constructed by John Stuart, an early Cumberland County Judge. The home was fully restored 2016-2019. This home features 5 guest rooms, each with a private bath, high speed wi-fi, daily breakfast and well appointed, luxurious rooms.',
        price: 167
      },
      {
        ownerId: 2,
        address: '2 Main Ave',
        city: "Wayne",
        state: 'New Jersey',
        country: 'USA',
        lat: 55.4,
        lng: 40.457,
        name: 'Artsy Room & Bathroom in the ByWard Market',
        description: 'Bright bedroom with private bathroom. It has a closet, desk & comfy chair, and storage area. It hosts one guest only.',
        price: 760
      },
      {
        ownerId: 2,
        address: '87 Perry Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        lat: 5.4563,
        lng: 4.75345,
        name: 'Guesthouse Bedroom 1/Private Parking',
        description: 'Welcome to your 1874 mansion in the city, with off-street parking on premises!',
        price: 80
      },
      {
        ownerId: 2,
        address: '31 Wallow Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        lat: -50.7752,
        lng: -40.45378537,
        name: 'Antebellum, Romantic Rococo bedroom',
        description: 'Historic Greek Revival, near the edge of the French Quarter. This beautiful home is dressed out in period style, ornamental plaster, marble fireplaces and antique furnishings. The crowning glory of this property is a gorgeous courtyard. Lush and private with fountains, ornamental fish pound and hot tub and beautiful gardens. Our rooms offer antique furnishing queen size beds free internet and private bathroom & mini fridge & coffee pot.',
        price: 2300
      },
      {
        ownerId: 3,
        address: '46 Easton Ave',
        city: "Fair Lawn",
        state: 'New Jersey',
        country: 'USA',
        lat: 50.74373,
        lng: 42.453,
        name: 'Beautiful Bedroom in West LA Architectural Gem',
        description: 'Designed by architect Neil Denari, our home has been featured in The NY Times, Los Angeles Magazine, & Vogue.',
        price: 1200
      },
      {
        ownerId: 4,
        address: '95 North Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        lat: -40.4,
        lng: 40,
        name: 'Plush Victorian Bedroom on a Tree Alley - SOMA',
        description: 'Golden Nugget is a small, gorgeous Victorian bedroom with a Queen size bed, Layla memory foam mattress (rated in top 3 best mattress brands), soft and comfortable bedding, sleep sound machine and multi-colored LED mood lighting (which can be set to any color) to provide a restful and cozy stay. Your room has a walk-in closet & dresser, a dedicated workspace with a Herman Miller Setu office chair, high speed fiberoptic internet (speeds up to 1GB), and Alexa (Echo Dot) to keep you company.',
        price: 450
      },
      {
        ownerId: 4,
        address: '6 South Ave',
        city: "Ridgefield",
        state: 'New Jersey',
        country: 'USA',
        lat: 50.41538,
        lng: 40.7863453,
        name: 'Lockes Glen Lakefront Suite - 1 or 2 bedroom',
        description: 'Welcome to the home of million dollar sunsets!',
        price: 130
      },
      {
        ownerId: 5,
        address: '35 Broad Ave',
        city: "Cape May",
        state: 'New Jersey',
        country: 'USA',
        // lat: 54.241,
        // lng: 43.555,
        name: 'Beautiful friendly family home',
        description: 'Lovely family home only a ten minute drive from the start of the West Highland Way and within easy reach of the city centre of Glasgow. We offer a comfortable double bedroom, a bathroom for the exclusive use of guests and a simple help yourself breakfast. Please note, we have another single room listed so the bathroom may sometimes be shared with another guest. You can ask about this at the time of booking.',
        price: 650
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
