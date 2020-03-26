'use strict';

const { Sequelize, connection } = require('../connection')

class Cidade extends Sequelize.Model { }
Cidade.init({
  id: DataTypes.INTEGER,
  nome: DataTypes.STRING,
  uf: DataTypes.STRING
}, {
  sequelize: connection,
  tableName: 'cidade',
  freezeTableName: true,
  timestamps: true,
  name: {
    singular: 'cidade',
    plural: 'pessoas'
  },
  underscored: false
})
