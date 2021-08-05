/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const allowedEmails = sequelize.define('allowedEmails', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //   validateEmail(value) {
      //     if (!/^[\w.+\-]+@gmail\.com$/i.test(value)) {
      //       throw new Error('The email has to be a valid google email!');
      //     }
      //   },
      // },
    },
  }, {});
  allowedEmails.associate = function (models) {
    // associations can be defined here
  };
  return allowedEmails;
};
