module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('attendances', 'sprintId', {
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

  down: (queryInterface, Sequelize) => Promise.all([queryInterface.removeColumn('attendances', 'sprintId')]),
};
