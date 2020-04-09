'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('pessoa',[
      {
        id: 1,
        nome: "Emanuel Diogo Jorge Corte Real",
        cidade_id: 6,
        data_nascimento: '1987-08-18',
        situacao: 1
      },
      {
        id: 2,
        nome: "Murilo Yuri Aparício",
        cidade_id: 3,
        data_nascimento: '1991-02-13',
        situacao: 1
      },
      {
        id: 3,
        nome: "Carlos Julio Leonardo das Neves",
        cidade_id: 4,
        data_nascimento: '1985-10-03',
        situacao: 1
      },
      {
        id: 4,
        nome:"Marcela Cláudia Gonçalves",
        cidade_id: 1,
        data_nascimento: '1993-12-16',
        situacao: 1
      },
      {
        id: 5,
        nome:"Allana Liz Alves",
        cidade_id: 2,
        data_nascimento: '1983-01-01',
        situacao: 1
      },
      {
        id: 6,
        nome: "Carlos Julio Leonardo das Neves",
        cidade_id: 4,
        data_nascimento: '1985-10-03',
        situacao: 1
      },
      {
        id: 7,
        nome: "Carlos Julio Leonardo das Neves",
        cidade_id: 4,
        data_nascimento: '1985-10-03',
        situacao: 1
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('pessoa')
  }
};
