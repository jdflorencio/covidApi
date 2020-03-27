'use strict';
const { Sequelize, connection } = require('../connection')

class Quadro extends Sequelize.Model { }

Quadro.init({
    uf: DataTypes.STRING,
    caso_suspeito: DataTypes.INTEGER,
    caso_confirmado: DataTypes.INTEGER,
    caso_descartado: DataTypes.INTEGER
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

modules.exports = Quadro
