const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

// Produtos
router.post('/produto', estoqueController.adicionarProduto);
router.get('/produto', estoqueController.listarProdutos);
router.put('/produto/:id', estoqueController.atualizarProduto);
router.delete('/produto/:id', estoqueController.removerProduto);

module.exports = router;
