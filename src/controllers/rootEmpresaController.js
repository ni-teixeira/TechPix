var empresaModel = require("../models/rootEmpresaModel");

function search(req, res) {
  const id = req.params.id;
  const mensagem = req.params.mensagem;

  empresaModel.search(id, mensagem)
  .then((resultado) => {
    res.json({
      lista: resultado
    })
  });
}

function filtrar(req, res) {
  const id = req.params.id;
  const selecionado = req.params.selecionado;

  empresaModel.filtrar(id, selecionado)
  .then((resultado) => {
    res.json({
      lista: resultado
    })
  });
}

function pesquisarFiltro(req, res) {
  const id = req.params.id;
  const tipo = req.params.tipo;
  const filtro = req.params.filtro;

  empresaModel.procurarFiltro(id, tipo, filtro)
  .then((resultado) => {
    res.json({
      lista: resultado
    })
  });
}

function procurarCards(req, res) {
  const id = req.params.id;

  empresaModel.procurarCards(id)
  .then((resultado) => {
    res.json({
      lista: resultado
    })
  });
}

function atualizarFuncionario(req, res) {
  const id = req.body.idFuncionarioServer;
  const nome = req.body.nomeServer;
  const email = req.body.emailServer;
  const cargo = req.body.cargoServer;
  const equipe = req.body.equipeServer;

  empresaModel.atualizarFuncionario(id, nome, email, cargo, equipe)
  .then(function (resposta) {
    res.json({
      lista: resposta
    });
  })
}

function cadastrarFuncionario(req, res) {
  const nome = req.body.nomeServer;
  const email = req.body.emailServer;
  const cargo = req.body.cargoServer;
  const senha = req.body.senhaServer;
  const fkEmpresa = req.body.fkEmpresaServer;

  empresaModel.cadastrarFuncionario(nome, email, cargo, senha, fkEmpresa)
  .then(function (resposta) {
    res.json({
      lista: resposta
    })
  })
} 

function removerFuncionario(req, res) {
  const idFuncionario = req.body.idFuncionarioServer;
  console.log(idFuncionario + " Controller");

  empresaModel.removerFuncionario(idFuncionario)
  .then(function (resultado) {
    res.send({
      lista: resultado
    })
  })
}

module.exports = {
  search,
  filtrar,
  pesquisarFiltro,
  procurarCards,
  atualizarFuncionario,
  cadastrarFuncionario,
  removerFuncionario
};
