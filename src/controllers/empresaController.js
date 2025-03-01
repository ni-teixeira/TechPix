const empresaModel = require("../models/empresaModel")

function autenticar(req, res) {
    var codigo_empresa = req.body.codigoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    
        empresaModel.autenticar(codigo_empresa, email, senha)
            .then(
                function (resultadoAutenticar) {
                    res.json({
                        id: resultadoAutenticar[0].idEmpresa,
                        email: resultadoAutenticar[0].email,
                        nome: resultadoAutenticar[0].razaoSocial
                    });
                }
            ).catch(
                function (erro) {
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

module.exports = {
    autenticar
}