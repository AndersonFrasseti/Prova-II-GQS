const { DataTypes } = require('sequelize');
const {sequelize} = require('./database');
const {Produto} = require('./produto');

const Estoque = sequelize.define('Estoque', {
    produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id',
        },
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'estoque',
    timestamps: false,
});

// Relacionar Estoque com Produto (um estoque está associado a um produto)
Estoque.belongsTo(Produto, { foreignKey: 'produtoId' });

module.exports = {Estoque};
