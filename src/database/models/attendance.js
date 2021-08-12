'use strict';
module.exports = (sequelize, DataTypes) => {
  const attendance = sequelize.define('attendance', {
    trainee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
    date: DataTypes.DATE,
    sessionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
    },
  }, {});

  attendance.associate = (models) => {

    attendance.belongsTo(models.user, {
      foreignKey: 'trainee',
      onDelete: 'CASCADE',
    });
    attendance.belongsTo(models.session, {
      foreignKey: 'sessionid',
      onDelete: 'CASCADE',
    });
  };
  return attendance;
};