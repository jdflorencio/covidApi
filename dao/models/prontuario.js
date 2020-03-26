'use strict';
module.exports = (sequelize, DataTypes) => {
  const prontuario = sequelize.define('prontuario', {
    id: DataTypes.INTEGER,
    pessoa_id: DataTypes.INTEGER,
    situacao: DataTypes.INTEGER,
    data_hora: DataTypes.DATE
  }, {});
  prontuario.associate = function(models) {
    // associations can be defined here
  };
  return prontuario;
};