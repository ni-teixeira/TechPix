var database = require("../database/config")

function autenticar(codigo_empresa, email, senha) {
    var instrucaoSql = `SELECT usuarios.id, usuarios.nome, usuarios.email, empresas.codigo_empresa FROM usuarios JOIN empresas ON empresas.id = usuarios.fkEmpresa WHERE codigo_empresa = '${codigo_empresa}' AND usuarios.email = '${email}' AND usuarios.senha = '${senha}';`;

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