/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'allowedEmails',
    [
      {
        email: 'emmanuelnkubito2@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'renepromesse@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'muhire416@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'iradukundairenee9@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'mheir299@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'cniyindagiriye@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('allowedEmails', null, {}),
};
