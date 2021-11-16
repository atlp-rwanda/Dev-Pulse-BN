const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class sprint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sprint.belongsTo(models.program, {
        foreignKey: 'programId',
      });
      sprint.hasMany(models.attendance, {
        foreignKey: 'sprintId',
      });
      sprint.hasMany(models.rating, {
        foreignKey: 'sprintId',
      });
    }
  }
  sprint.init(
    {
      name: DataTypes.STRING,
      programId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'sprint',
    },
  );
  return sprint;
};
