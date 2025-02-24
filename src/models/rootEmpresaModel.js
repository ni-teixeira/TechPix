var database = require("../database/config");

function search(id, mensagem) {
  let instrucaoSql = `SELECT * FROM usuarios WHERE nome LIKE '%${mensagem}%' AND fkEmpresa = ${id}`;

  return database.executar(instrucaoSql);
}

function filtrar(id, selecionado) {
  let instrucaoSql = `SELECT ${selecionado} AS 'Cargo' FROM usuarios WHERE fkEmpresa = ${id}`;

  return database.executar(instrucaoSql);
}

function procurarFiltro(id, tipo, filtro) {
  let instrucaoSql;
    if(filtro == "ASC" || filtro == "DESC") {
      instrucaoSql = `SELECT * FROM usuarios WHERE fkEmpresa = ${id} ORDER BY ${tipo} ${filtro}`;
    } else if(filtro.includes("@")) {
      instrucaoSql = `SELECT * FROM usuarios WHERE ${tipo} LIKE "%${filtro}" AND fkEmpresa = ${id}`;
    } else {
      instrucaoSql = `SELECT * FROM usuarios WHERE ${tipo} = "${filtro}" AND fkEmpresa = ${id}`;
    }

    return database.executar(instrucaoSql);
}

function procurarCards(id) {
  let instrucaoSql = `SELECT * FROM usuarios WHERE fkEmpresa = ${id}`;

  return database.executar(instrucaoSql);
}

function atualizarFuncionario(id, nome, email, cargo, nivel) {
  let instrucaoSql = `UPDATE usuarios SET nome = "${nome}", email = "${email}", cargo = "${cargo}", nivel = "${nivel}" WHERE id = ${id};`;
  
  return database.executar(instrucaoSql);
}

function cadastrarFuncionario(nome, email, cargo, nivel, fkEmpresa) {
  let instrucaoSql = `INSERT INTO usuarios (nome, email, cargo, nivel, fkEmpresa) VALUES ("${nome}", "${email}", "${cargo}", "${nivel}", ${fkEmpresa});`;

  return database.executar(instrucaoSql);
}

function removerFuncionario(idFunc) {
  let instrucaoSql = `DELETE FROM usuarios WHERE id = ${idFunc};`

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
