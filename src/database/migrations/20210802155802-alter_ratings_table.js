module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('ratings', 'program', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'programs',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('ratings', 'program'),
  ]),
};
