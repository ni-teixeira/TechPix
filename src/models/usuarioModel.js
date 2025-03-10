var database = require("../database/config")

function autenticar(codigo_empresa, email, senha) {
    var instrucaoSql = `
    SELECT 
        f.idFuncionario, 
        f.nome,
        e.idEmpresa, 
        e.razaoSocial, 
        f.cargo AS cargo
    FROM Funcionario as f
    JOIN Empresa as e 
    ON f.fkEmpresa = e.idEmpresa
    WHERE f.email = '${email}'
    AND e.codigoEmpresa = '${codigo_empresa}'
    AND f.senha = '${senha}';`;

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