'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cidade', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(60)
      },
      uf: {
        type: Sequelize.STRING(2)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cidade');
  }
};