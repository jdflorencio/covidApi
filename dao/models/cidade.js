'use strict';
module.exports = (sequelize, DataTypes) => {
  const cidade = sequelize.define('cidade', {
    id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    uf: DataTypes.STRING
  }, {});
  cidade.associate = function(models) {
    // associations can be defined here
  };
  return cidade;
};