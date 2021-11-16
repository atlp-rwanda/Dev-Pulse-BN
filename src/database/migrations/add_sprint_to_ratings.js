module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('ratings', 'sprintId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'sprints',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([queryInterface.removeColumn('ratings', 'sprintId')]),
};
