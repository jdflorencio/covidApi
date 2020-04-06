'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('prontuario', [
      {
        id: 1,
        pessoa_id: 1,
        situacao: 1,
        data_hora: new Date()
      },
      {
        id: 2,
        pessoa_id: 2,
        situacao: 1,
        data_hora: new Date()
      },
      {
        id: 3,
        pessoa_id: 3,
        situacao: 1,
        data_hora: new Date()
      },
      {
        id: 4,
        pessoa_id: 4,
        situacao: 1,
        data_hora: new Date()
      },
      {
        id: 5,
        pessoa_id: 5,
        situacao: 1,
        data_hora: new Date()
      },
      {
        id: 6,
        pessoa_id: 5,
        situacao: 2,
        data_hora: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('prontuario')
  }
};
