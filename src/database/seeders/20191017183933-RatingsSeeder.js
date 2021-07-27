/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ratings",
      [
        {
          user: 2,
          quality: JSON.stringify({
            rate: 2,
            feedback: "THis is LF's feedback",
          }),
          quantity: JSON.stringify({
            rate: 2,
            feedback: "THis is LF's feedback",
          }),
          ProfessionalCommunication: JSON.stringify({
            rate: 1,
            feedback: "THis is LF's feedback",
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user: 3,
          quality: JSON.stringify({
            rate: 1,
            feedback: "THis is LF's feedback",
          }),
          quantity: JSON.stringify({
            rate: 2,
            feedback: "THis is LF's feedback",
          }),
          ProfessionalCommunication: JSON.stringify({
            rate: 2,
            feedback: "THis is LF's feedback",
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user: 3,
          quality: JSON.stringify({
            rate: 2,
            feedback: "THis is LF's feedback",
          }),
          quantity: JSON.stringify({
            rate: 0,
            feedback: "THis is LF's feedback",
          }),
          ProfessionalCommunication: JSON.stringify({
            rate: -2,
            feedback: "THis is LF's feedback",
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user: 4,
          quality: JSON.stringify({
            rate: 2,
            feedback: "THis is LF's feedback",
          }),
          quantity: JSON.stringify({
            rate: -2,
            feedback: "THis is LF's feedback",
          }),
          ProfessionalCommunication: JSON.stringify({
            rate: 2,
            feedback: "THis is LF's feedback",
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user: 4,
          quality: JSON.stringify({
            rate: 0,
            feedback: "THis is LF's feedback",
          }),
          quantity: JSON.stringify({
            rate: 1,
            feedback: "THis is LF's feedback",
          }),
          ProfessionalCommunication: JSON.stringify({
            rate: -1,
            feedback: "THis is LF's feedback",
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user: 4,
          quality: JSON.stringify({
            rate: 0,
            feedback: "THis is LF's feedback",
          }),
          quantity: JSON.stringify({
            rate: 1,
            feedback: "THis is LF's feedback",
          }),
          ProfessionalCommunication: JSON.stringify({
            rate: -2,
            feedback: "THis is LF's feedback",
          }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("ratings", null, {}),
};
