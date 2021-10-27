module.exports = (sequelize, DataTypes) => {
  const program = sequelize.define(
    'program',
    {
      name: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      cohortId: DataTypes.INTEGER,
    },
    {},
  );
  program.associate = (models) => {
    program.hasMany(models.user, {
      foreignKey: 'program',
    });
    program.hasMany(models.rating, {
      foreignKey: 'program',
    });
    program.belongsTo(models.cohort, {
      foreignKey: 'cohortId',
    });
    program.hasMany(models.sprint, {
      foreignKey: 'programId',
    });
  };
  return program;
};
