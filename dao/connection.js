'use strict';

const {Sequelize, DataTypes} = require('sequelize')
require('dotenv').config();

DataTypes.DATE.prototype._stringfy = function _stringfy(date, options) {
  date = this.applyTimezone(date, options)
  return date.format('YYYY-MM-DD HH:mm:ss.SS')
}

const database = {
  dev: {
    connection: new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOSTNAME,
      dialect: process.env.DB_DIALECT,
      port: process.env.DB_PORT,
      logging: console.log,
      timezone: "-03:00"
   
    })
  },
  test: {

  },
  production: {

  }
}

const ambiente = database[process.env.ENVIROMENT]

module.exports = {
  connection: ambiente.connection,
  Sequelize
}