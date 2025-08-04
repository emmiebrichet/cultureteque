'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Musiques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      titre: {
        type: Sequelize.STRING
      },
      artiste: {
        type: Sequelize.STRING
      },
      album: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      motsCle1: {
        type: Sequelize.STRING
      },
      motsCle2: {
        type: Sequelize.STRING
      },
      motsCle3: {
        type: Sequelize.STRING
      },
      motsCle4: {
        type: Sequelize.STRING
      },
      motsCle5: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Musiques');
  }
};