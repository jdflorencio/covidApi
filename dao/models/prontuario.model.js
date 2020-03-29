'use strict';
const { Sequelize, connection } = require('../connection')

class Prontuario extends Sequelize.Model { }
Prontuario.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pessoa_id: Sequelize.INTEGER,
  situacao: Sequelize.INTEGER,
  data_hora: Sequelize.DATE
  },
  {
    sequelize: connection,
    tableName: 'prontuario',
    freezeTableName: true,
    timestamps: false,
    name: {
      singular: 'prontuario',
      plural: 'prontuario'
    },
    underscored: false
})


module.exports = Prontuario

