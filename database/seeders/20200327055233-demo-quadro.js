'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('quadro', [
      {
        uf: "BA",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "ES",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "RJ",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "SP",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "AL",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "PE",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "CE",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "PB",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "MG",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "RR",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "RO",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "AC",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "AM",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "MA",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "AP",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      {
        uf: "PI",
        caso_suspeito: 5 + Math.floor((100 - 1) * Math.random()),
        caso_analise: 5 + Math.floor((40 - 1) * Math.random()),
        caso_confirmado: 5 + Math.floor((40 - 1) * Math.random()),
        caso_descartado: 5 + Math.floor((60 - 1) * Math.random())
      },
      

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('quadro')
  }
};
