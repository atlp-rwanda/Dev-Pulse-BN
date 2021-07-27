/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const rating = sequelize.define(
    "rating",
    {
      trainee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
        },
      },
      quality: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      ProfessionalCommunication: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
    },
    {}
  );
  rating.associate = (models) => {
    rating.belongsTo(models.user, {
      foreignKey: "trainee",
      onDelete: "CASCADE",
    });
  };
  return rating;
};
