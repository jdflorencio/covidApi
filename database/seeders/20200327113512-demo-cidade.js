'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cidade', [
      {
        id: 1,
        nome: "Teixeira De Freitas",
        uf: "BA"
      },
      {
        id: 2,
        nome: "Eunápolis",
        uf: "BA"

      },
      {
        id: 3,
        nome: "Porto Seguro",
        uf: "BA"
      },
      {
        id: 4,
        nome: "Mucuri",
        uf: "BA"
      },
      {
        id: 5,
        nome: "Alcobaça",
        uf: "BA"
      },
      {
        id: 6,
        nome: "Prado",
        uf: "BA"
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cidade')
  }
};
