/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    googleId: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    managerId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Trainee',
      validate: {
        isIn: {
          args: [
            [
              'Trainee',
              'Manager',
              'Lead',
            ],
          ],
          msg:
            'Role must either be Engineer, Manager or Lead',
        },
      },
    },
    cohort: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    program: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    graduated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {});
  user.associate = (models) => {
    user.belongsTo(models.user, {
      foreignKey: 'managerId',
      as: 'manager',
      foreignKeyConstraint: true,
    });
    user.hasMany(models.rating, {
      foreignKey: 'trainee',
    });
    user.hasMany(models.group, {
      foreignKey: 'manager',
    });
    user.belongsTo(models.program, {
      foreignKey: 'program',
      as: 'programInfo',
    });
    user.belongsTo(models.cohort, {
      foreignKey: 'cohort',
      as: 'cohortInfo',
    });
  };
  return user;
};
