'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('sessions', [{
      name: 'Stand up',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Proffesional skills',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Demo',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('sessions', null, {});
  }
};
