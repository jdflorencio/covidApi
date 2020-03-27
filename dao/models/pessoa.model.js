'use strict';
const { Sequelize, connection } = require('../connection')
const Prontuario = require('./prontuario.model')

class Pessoa extends Sequelize.Model { }
Pessoa.init({
  id: DataTypes.INTEGER,
  nome: DataTypes.STRING,
  data_nascimento: DataTypes.DATEONLY,
  cidade_id: DataTypes.INTEGER,
  situacao: DataTypes.INTEGER
}, {
  sequelize: connection,
  tableName: 'pessoa',
  freezeTableName: true,
  timestamps: true,
  name: {
    singular: 'pessoa',
    plural: 'pessoa'
  },
  underscored: false
})

Pessoa.hasMany(Prontuario, {
  foreignKey: "pessoa_id",
  onDelete: 'NO ACTION',
  onUpdate: "NO ACTION"
})

module.exports = Pessoa