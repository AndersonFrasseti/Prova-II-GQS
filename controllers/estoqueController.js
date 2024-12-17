const Produto = require('../models/produto');
const Categoria = require('../models/categoria');
const Estoque = require('../models/estoque');

const adicionarProduto = async (req, res) => {
    try {
        const { nome, quantidade, preco, categoriaId } = req.body;
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        const produto = await Produto.create({ nome, quantidade, preco, categoriaId });
        await Estoque.create({ produtoId: produto.id, quantidade }); // Adiciona ao estoque
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar produto', details: error.message });
    }
};

const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: [
                {
                    model: Categoria,
                    as: 'categoria',
                    attributes: ['nome'],
                },
            ],
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos', details: error.message });
    }
};

const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, quantidade, preco, categoriaId } = req.body;
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        await produto.update({ nome, quantidade, preco, categoriaId });
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar produto', details: error.message });
    }
};

const removerProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        await produto.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover produto', details: error.message });
    }
};

module.exports = {
    adicionarProduto,
    listarProdutos,
    atualizarProduto,
    removerProduto,
};
