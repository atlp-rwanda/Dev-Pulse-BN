module.exports = (sequelize, DataTypes) => {
  const cohort = sequelize.define('cohort', {
    name: DataTypes.STRING,
  }, {});
  cohort.associate = (models) => {
    cohort.hasMany(models.user, {
      foreignKey: 'cohort',
    });
    cohort.hasMany(models.program, {
      foreignKey: 'cohortId',
    });
  };
  return cohort;
};
