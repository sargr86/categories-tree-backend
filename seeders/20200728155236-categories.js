'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: 'ELECTRONICS',
        id:1
      },
      {
        name: 'TELEVISIONS',
      },
      {
        name: 'LCD'
      },
      {
        name: 'PLASMA'
      },
      {
          name: 'PORTABLE ELECTRONICS'
      }
      ,{
          name: 'MP3 PLAYERS'
      }
      ,{
          name: 'FLASH'
      },
      {
          name: 'CD PLAYERS'
      },
      {
        name: '2 WAY RADIOS'
      },
    ])

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('positions', null, {});
  }
};
//(1,'ELECTRONICS',NULL,0),
//
// (2,'TELEVISIONS',1,0),
//
// (3,'TUBE',2,0),
//
// (4,'LCD              ',2,1),
//
// (5,'PLASMA',2,3),
//
// (6,'PORTABLE ELECTRONICS',1,1),
//
// (7,'MP3 PLAYERS',6,0),
//
// (8,'FLASH',7,0),
//
// (9,'CD PLAYERS',6,2),
//
// (10,'2 WAY RADIOS',6,1),
