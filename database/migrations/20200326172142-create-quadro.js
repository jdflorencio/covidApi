'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quadro', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uf: {
        type: Sequelize.STRING(2)
      },
      caso_suspeito: {
        type: Sequelize.INTEGER
      },
      caso_analise: {
        type: Sequelize.INTEGER
      },
      caso_confirmado: {
        type: Sequelize.INTEGER
      },
      caso_descartado: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('quadro');
  }
};