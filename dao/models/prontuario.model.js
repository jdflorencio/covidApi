'use strict';
const { Sequelize, connection } = require('../connection')

class Prontuario extends Sequelize.Model {}

Prontuario.init({
  id: Sequelize.INTEGER,
  pessoa_id: Sequelize.INTEGER,
  situacao: Sequelize.INTEGER,
  data_hora: Sequelize.DATE
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

