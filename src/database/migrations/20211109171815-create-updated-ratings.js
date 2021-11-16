module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('updatedRatings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ratingId: {
        type: Sequelize.INTEGER,
      },
      quality: {
        type: Sequelize.JSONB,
      },
      quantity: {
        type: Sequelize.JSONB,
      },
      communication: {
        type: Sequelize.JSONB,
      },
      status: {
        type: Sequelize.STRING,
        default: 'NOT_APPROVED',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('updatedRatings');
  },
};
