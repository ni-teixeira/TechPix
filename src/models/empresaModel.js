var database = require("../database/config")

function autenticar(codigo_empresa, email, senha) {
    var instrucaoSql = `SELECT idEmpresa, razaoSocial, email, codigoEmpresa FROM Empresa WHERE codigoEmpresa = '${codigo_empresa}' AND email = '${email}' AND senha = '${senha}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar
};
  