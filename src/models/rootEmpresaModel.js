var database = require("../database/config");

function search(id, mensagem) {
  let instrucaoSql = "";

  if(mensagem == 1) {
    instrucaoSql = `SELECT * FROM Funcionario WHERE fkEmpresa = ${id} AND cargo <> "Gestor"`;
  } else {
    instrucaoSql = `SELECT * FROM Funcionario WHERE nome LIKE '%${mensagem}%' AND fkEmpresa = ${id} AND cargo <> "Gestor";`;
  }

  return database.executar(instrucaoSql);
}

function filtrar(id, selecionado) {
  let instrucaoSql = `SELECT ${selecionado} AS 'Cargo' FROM Funcionario WHERE fkEmpresa = ${id};`;

  return database.executar(instrucaoSql);
}

function procurarFiltro(id, tipo, filtro) {
  let instrucaoSql;
    if(filtro == "ASC" || filtro == "DESC") {
      instrucaoSql = `SELECT * FROM Funcionario WHERE fkEmpresa = ${id} ORDER BY ${tipo} ${filtro} AND cargo <> "Gestor"`;
    } else if(filtro.includes("@")) {
      instrucaoSql = `SELECT * FROM Funcionario WHERE ${tipo} LIKE "%${filtro}" AND fkEmpresa = ${id} AND cargo <> "Gestor"`;
    } else {
      instrucaoSql = `SELECT * FROM Funcionario WHERE ${tipo} = "${filtro}" AND fkEmpresa = ${id} AND cargo <> "Gestor"`;
    }

    return database.executar(instrucaoSql);
}

function procurarCards(id) {
  let instrucaoSql = `SELECT * FROM Funcionario WHERE fkEmpresa = ${id} AND cargo <> "Gestor"`;

  return database.executar(instrucaoSql);
}

function atualizarFuncionario(id, nome, email, cargo, equipe) {
  let instrucaoSql = `UPDATE Funcionario SET nome = "${nome}", email = "${email}", cargo = "${cargo}", equipe = "${equipe}" WHERE idFuncionario = ${id};`;
  
  return database.executar(instrucaoSql);
}

function cadastrarFuncionario(nome, email, cargo, senha, fkEmpresa) {
  let instrucaoSql = `INSERT INTO Funcionario (nome, email, senha, cargo, fkEmpresa) VALUES ("${nome}", "${email}", "${senha}", "${cargo}", ${fkEmpresa});`;

  return database.executar(instrucaoSql);
}

function removerFuncionario(idFunc) {
  let instrucaoSql = `DELETE FROM Funcionario WHERE idFuncionario = ${idFunc};`

  return database.executar(instrucaoSql);
}

module.exports = {
  search,
  filtrar,
  procurarFiltro,
  procurarCards,
  atualizarFuncionario,
  cadastrarFuncionario,
  removerFuncionario
};
