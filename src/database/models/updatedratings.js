const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class updatedRatings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      updatedRatings.belongsTo(models.rating, {
        foreignKey: 'ratingId',
      });
    }
  }
  updatedRatings.init(
    {
      ratingId: DataTypes.INTEGER,
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
      status: {
        type: DataTypes.STRING,
        defaultValue: 'NOT_APPROVED',
      },
    },
    {
      sequelize,
      modelName: 'updatedRatings',
    },
  );
  return updatedRatings;
};
