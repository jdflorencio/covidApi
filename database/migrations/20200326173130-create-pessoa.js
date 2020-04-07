'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(60)
      },
      data_nascimento: {
        type: Sequelize.DATEONLY
      },
      cidade_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cidade',
          key: 'id'
        }
      },
      situacao: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pessoa');
  }
};