/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const rating = sequelize.define(
    'rating',
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
      communication: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      program: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      sprintId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
    {},
  );
  rating.associate = (models) => {
    rating.belongsTo(models.user, {
      foreignKey: 'trainee',
      onDelete: 'CASCADE',
    });
    rating.belongsTo(models.program, {
      foreignKey: 'program',
      as: 'programInfo',
    });
    rating.belongsTo(models.sprint, {
      foreignKey: 'sprintId',
      as: 'sprintInfo',
    });
  };
  return rating;
};
