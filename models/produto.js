const { DataTypes } = require('sequelize');
const {sequelize} = require('./database');
const {Categoria} = require('./categoria');

const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'produtos',
    timestamps: false, // Desativa createdAt e updatedAt
});

// Definir o relacionamento (um produto pode ter uma categoria)
Produto.belongsTo(Categoria, {
    foreignKey: 'categoriaId',
    as: 'categoria',
});

module.exports = {Produto};
