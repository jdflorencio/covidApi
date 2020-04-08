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
        type: Sequelize.STRING(2),
        defaultValue: 0
      },
      caso_suspeito: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      caso_analise: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      caso_confirmado: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      caso_descartado: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('quadro');
  }
};