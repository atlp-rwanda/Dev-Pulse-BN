/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'allowedEmails',
    [
      {
        email: 'renepromesse@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'ntirenganyarened1@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('allowedEmails', null, {}),
};
