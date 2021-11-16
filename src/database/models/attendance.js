module.exports = (sequelize, DataTypes) => {
  const attendance = sequelize.define(
    'attendance',
    {
      trainee: DataTypes.INTEGER,
      date: DataTypes.DATE,
      sessionId: DataTypes.INTEGER,
      attendance: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      programId: DataTypes.INTEGER,
      sprintId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
    },
    {},
  );
  attendance.associate = function (models) {
    // associations can be defined here
    attendance.belongsTo(models.user, {
      foreignKey: 'trainee',
      as: 'traineeInfo',
    });
    attendance.belongsTo(models.sessions, {
      foreignKey: 'sessionId',
      as: 'session',
    });
    attendance.belongsTo(models.program, {
      foreignKey: 'programId',
      as: 'program',
    });
    attendance.belongsTo(models.sprint, {
      foreignKey: 'sprintId',
    });
  };
  return attendance;
};
