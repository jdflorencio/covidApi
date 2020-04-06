'use strict';

const { Sequelize, connection } = require('../connection')
const Pessoa = require('./pessoa.model')

class Cidade extends Sequelize.Model { }
Cidade.init({
  id:  {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: Sequelize.STRING,
  uf: Sequelize.STRING
}, {
  sequelize: connection,
  tableName: 'cidade',
  freezeTableName: true,
  timestamps: false,
  name: {
    singular: 'cidade',
    plural: 'cidade'
  },
  underscored: false
})

Cidade.hasMany(Pessoa, {
  foreignKey: "cidade_id",
  onDelete: 'NO ACTION',
  onUpdate: "NO ACTION"
})

Pessoa.belongsTo(Cidade, {
  foreignKey: "cidade_id"
})
module.exports = Cidade
