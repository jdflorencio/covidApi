'use strict';
module.exports = (sequelize, DataTypes) => {
  const quadro = sequelize.define('quadro', {
    uf: DataTypes.STRING,
    caso_suspeito: DataTypes.INTEGER,
    caso_confirmado: DataTypes.INTEGER,
    caso_descartado: DataTypes.INTEGER
  }, {});
  quadro.associate = function(models) {
    // associations can be defined here
  };
  return quadro;
};