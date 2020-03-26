'use strict';
module.exports = (sequelize, DataTypes) => {
  const pessoa = sequelize.define('pessoa', {
    id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    data_nascimento: DataTypes.DATEONLY,
    cidade_id: DataTypes.INTEGER,
    situacao: DataTypes.INTEGER
  }, {});
  pessoa.associate = function(models) {
    // associations can be defined here
  };
  return pessoa;
};