'use strict';
module.exports = (sequelize, DataTypes) => {
  const sessions = sequelize.define('sessions', {
    name: DataTypes.STRING
  }, {});
  sessions.associate = function(models) {
    // associations can be defined here
  };
  return sessions;
};