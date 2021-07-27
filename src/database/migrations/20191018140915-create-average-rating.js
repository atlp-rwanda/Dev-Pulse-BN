module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("averageRatings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      trainee: {
        type: Sequelize.INTEGER,
      },
      submitter: {
        type: Sequelize.INTEGER,
      },
      quality: {
        type: Sequelize.DECIMAL,
      },
      quantity: {
        type: Sequelize.DECIMAL,
      },
      ProfessionalCommunication: {
        type: Sequelize.DECIMAL,
      },
      averageRating: {
        type: Sequelize.DECIMAL,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("averageRatings");
  },
};
