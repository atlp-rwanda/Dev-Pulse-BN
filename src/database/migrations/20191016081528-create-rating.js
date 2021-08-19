module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ratings', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    trainee: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        as: 'user',
      },
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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ratings'),
};
