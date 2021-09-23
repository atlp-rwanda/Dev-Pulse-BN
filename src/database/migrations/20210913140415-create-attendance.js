'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trainee: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      sessionId: {
        type: Sequelize.INTEGER
      },
      attendance: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.STRING
      },
      programId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('attendances');
  }
};