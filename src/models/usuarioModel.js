var database = require("../database/config")

function autenticar(codigo_empresa, email, senha) {
    var instrucaoSql = `SELECT Funcionario.id, Funcionario.nome, Funcionario.email, Empresa.codigo_empresa FROM Funcionario JOIN Empresa ON Empresa.idEmpresa = Funcionario.fkEmpresa WHERE codigo_empresa = '${codigo_empresa}' AND Funcionario.email = '${email}' AND usuarios.senha = '${senha}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, fkEmpresa) {
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha, fk_empresa) VALUES ('${nome}', '${email}', '${senha}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};