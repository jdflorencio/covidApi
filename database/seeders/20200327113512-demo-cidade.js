'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cidade', [
      {
        id: 1,
        nome: "Teixeira De Freitas",
        uf: "BA",
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 2,
        nome: "Eunápolis",
        uf: "BA",
        createdAt: new Date(), 
        updatedAt: new Date()

      },
      {
        id: 3,
        nome: "Porto Seguro",
        uf: "BA",
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 4,
        nome: "Mucuri",
        uf: "BA",
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 5,
        nome: "Alcobaça",
        uf: "BA",
        createdAt: new Date(), 
        updatedAt: new Date()
      },
      {
        id: 6,
        nome: "Prado",
        uf: "BA",
        createdAt: new Date(), 
        updatedAt: new Date()
      }
    ])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cidade')
  }
};
