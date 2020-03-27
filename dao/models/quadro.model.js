'use strict';
const { Sequelize, connection } = require('../connection')

class Quadro extends Sequelize.Model { }

Quadro.init({
    uf: Sequelize.STRING,
    caso_suspeito: Sequelize.INTEGER,
    caso_confirmado: Sequelize.INTEGER,
    caso_descartado: Sequelize.INTEGER
}, {

    sequelize: connection,
    tableName: 'quadro',
    freezeTableName: 'quadro',
    timestamps: false,
    name: {
        singular: "quadro",
        plural: "quadro"
    },
    underscored: false
})

module.exports = Quadro
