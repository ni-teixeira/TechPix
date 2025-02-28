var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/rootEmpresaController");
var empresasController = require("../controllers/empresaController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/:mensagem/:id/search", function (req, res) {
  empresaController.search(req, res);
})

router.get("/:selecionado/:id/filtro", function (req, res) {
  empresaController.filtrar(req, res);
})

router.get("/:id/:tipo/:filtro/pesquisarFiltro", function (req, res) {
  empresaController.pesquisarFiltro(req, res);
})

router.get("/:id/procurarCards", function (req, res) {
  empresaController.procurarCards(req, res);
})

router.put("/atualizarFuncionario", function (req, res) {
  empresaController.atualizarFuncionario(req, res);
})

router.post("/cadastrarFuncionario", function (req, res) {
  empresaController.cadastrarFuncionario(req, res);
})

router.post("/autenticar", function (req, res) {
  empresasController.autenticar(req, res);
});

router.delete(`/removerFuncionario`, function (req, res) {
  empresaController.removerFuncionario(req, res);
})

module.exports = router;