const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rota para adicionar uma nova categoria
router.post('/categoria', categoriaController.adicionarCategoria);

// Rota para listar todas as categorias
router.get('/categoria', categoriaController.listarCategorias);

// Rota para atualizar uma categoria específica
router.put('/categoria/:id', categoriaController.atualizarCategoria);

// Rota para remover uma categoria
router.delete('/categoria/:id', categoriaController.removerCategoria);

module.exports = router;
