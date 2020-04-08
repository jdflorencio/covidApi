'use strict';
const { Sequelize, connection } = require('../connection')
const Prontuario = require('./prontuario.model')


class Pessoa extends Sequelize.Model { }
Pessoa.init({
  id:  {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: Sequelize.STRING,
  data_nascimento: Sequelize.DATEONLY,
  cidade_id: Sequelize.INTEGER,
  situacao: Sequelize.INTEGER,
  
}, {
  sequelize: connection,
  tableName: 'pessoa',
  freezeTableName: true,
  timestamps: false,
  name: {
    singular: 'pessoa',
    plural: 'pessoa'
  },
  underscored: false
})

Pessoa.hasMany(Prontuario, {
  foreignKey: "pessoa_id",
  onDelete: 'CASCADE',
  onUpdate: "NO ACTION",
}
)

Prontuario.belongsTo(Pessoa, {
  foreignKey: "id"
})

module.exports = Pessoa