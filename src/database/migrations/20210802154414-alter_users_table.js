module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('users', 'graduated', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    }),
    queryInterface.addColumn('users', 'program', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'programs',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }),
    queryInterface.addColumn('users', 'cohort', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'cohorts',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('users', 'graduated'),
    queryInterface.removeColumn('users', 'program'),
    queryInterface.removeColumn('users', 'cohort'),
  ]),
};
