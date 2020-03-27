'use strict';
const { Sequelize, connection } = require('../connection')

class Prontuario extends Sequelize.Model { }

Prontuario.init({
  id: DataTypes.INTEGER,
  pessoa_id: DataTypes.INTEGER,
  situacao: DataTypes.INTEGER,
  data_hora: DataTypes.DATE
}, {
  sequelize: connection,
  tableName: 'pronturario',
  freezeTableName: true,
  timestamps: true,
  name: {
    singular: 'cidade',
    plural: 'cidade'
  },
  underscored: false
})

module.exports = Prontuario

