const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para adicionar um novo produto
router.post('/produto', produtoController.adicionarProduto);

// Rota para listar todos os produtos
router.get('/produto', produtoController.listarProdutos);

// Rota para atualizar um produto específico
router.put('/produto/:id', produtoController.atualizarProduto);

// Rota para remover um produto
router.delete('/produto/:id', produtoController.removerProduto);

module.exports = router;
