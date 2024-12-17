const { Produto } = require("../models/produto");
const { Categoria } = require("../models/categoria");

const adicionarProduto = async (req, res) => {
  try {
    const { nome, preco, quantidade, categoriaId } = req.body;

    console.log("Dados recebidos:", req.body); // Log dos dados recebidos

    if (!nome || preco == null || quantidade == null || !categoriaId) {
      console.log("Dados faltando ou inválidos:", { nome, preco, quantidade, categoriaId });
      return res.status(400).json({ error: "Nome, preço, quantidade e categoriaId são obrigatórios" });
    }

    const categoria = await Categoria.findByPk(categoriaId); // Aqui deve funcionar
    if (!categoria) {
      console.log("Categoria não encontrada:", categoriaId);
      return res.status(404).json({ error: "Categoria não encontrada" });
    }

    const produto = await Produto.create({ nome, preco, quantidade, categoriaId });
    console.log("Produto criado:", produto); // Log do produto criado
    res.status(201).json(produto);
  } catch (error) {
    console.log("Erro ao adicionar produto:", error);
    res.status(400).json({ error: "Erro ao adicionar produto", details: error.message });
  }
};




// Lista todos os produtos
const listarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: [{
                model: Categoria,
                as: 'categoria',
                attributes: ['nome'] // Inclui apenas o nome da categoria
            }]
        });
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar produtos', details: error.message });
    }
};

// Atualiza um produto específico
const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco, quantidade, categoriaId } = req.body;

        // Verifica se o produto existe
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Se informado, verifica se a categoria existe
        if (categoriaId) {
            const categoria = await Categoria.findByPk(categoriaId);
            if (!categoria) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }
        }

        // Atualiza o produto
        await produto.update({ nome, preco, quantidade, categoriaId });
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar produto', details: error.message });
    }
};

// Remove um produto
const removerProduto = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o produto existe
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Remove o produto
        await produto.destroy();
        res.status(204).send(); // Retorna sem conteúdo (no content)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover produto', details: error.message });
    }
};

module.exports = {
    adicionarProduto,
    listarProdutos,
    atualizarProduto,
    removerProduto
};
