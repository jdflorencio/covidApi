'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('quadro', [
      {
        uf: "BA",
        caso_suspeito:7 ,
        caso_analise: 0,
        caso_confirmado: 0,
        caso_descartado:0 
      }      
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('quadro')
  }
};
