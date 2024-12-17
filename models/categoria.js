const { DataTypes } = require('sequelize');
const {sequelize} = require('./database');

const Categoria = sequelize.define('Categoria', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'categorias',
    timestamps: false, // Desativa createdAt e updatedAt
});

module.exports = {Categoria};
