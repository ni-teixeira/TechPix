var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var codigo_empresa = req.body.codigoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    
        usuarioModel.autenticar(codigo_empresa, email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
                    // É assim que vai chegar o json no Script Login
                    res.json({
                        id_func: resultadoAutenticar[0].idFuncionario,
                        nome_func: resultadoAutenticar[0].nome,
                        id_empresa: resultadoAutenticar[0].idEmpresa,
                        nome_empresa: resultadoAutenticar[0].razaoSocial,
                        cargo_func: resultadoAutenticar[0].cargo,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].nome
                    });
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var fkEmpresa = req.body.idEmpresaVincularServer;

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

module.exports = {
    autenticar,
    cadastrar
}