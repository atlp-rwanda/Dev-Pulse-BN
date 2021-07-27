module.exports = (sequelize, DataTypes) => {
  const AverageRating = sequelize.define(
    "averageRating",
    {
      trainee: DataTypes.INTEGER,
      submitter: DataTypes.INTEGER,
      quality: DataTypes.DECIMAL,
      quantity: DataTypes.DECIMAL,
      ProfessionalCommunication: DataTypes.DECIMAL,
      averageRating: DataTypes.DECIMAL,
    },
    {}
  );
  AverageRating.associate = (models) => {
    // associations can be defined here
    AverageRating.belongsTo(models.user, {
      foreignKey: "trainee",
    });
  };
  return AverageRating;
};
