'use strict';
module.exports = (sequelize, DataTypes) => {
  const session = sequelize.define('session', {
    name: DataTypes.STRING
  }, {});
  session.associate = function (models) {
    session.hasMany(models.attendance, {
      foreignKey: 'sessionid'
    });

  };
  return session;
};