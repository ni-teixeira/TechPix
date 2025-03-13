function validarEmail() {
    var email = document.getElementById('iptemail').value;
    var mensagemErro = "";
    var tamanhoValido = false;

    if (!email) {
        mensagemErro = ` `
    }
    if (!email.includes('@')) {
        mensagemErro += `O email deve incluir '@'<br>`
    }
    if (!email.includes('.')) {
        mensagemErro += `O email deve incluir ponto '.'<br>`
    }
    if (email.includes(' ')) {
        mensagemErro += `O email não pode conter espaços<br>`
    }
    if (email.length < 5) {
        mensagemErro += `O email deve ter no mínimo 5 caracteres<br>`
    } else if (email.length > 100) {
        mensagemErro += `O email deve ter no máximo 100 caracteres<br>`
    } else {
        tamanhoValido = true;
    }

    divmsg.innerHTML = mensagemErro

    if (email.includes('@') && email.includes('.') && !email.includes(' ') && tamanhoValido) {
        return true;
    } else {
        return false;
    }

}

function validarSenha() {
    var senha = document.getElementById('iptsenha').value;
    var mensagemErro = ""
    var caracteres = ['!', '@', '#', '$', '%', '&', '*', '_', '?', '/']
    var especiais = false;
    var numero = false;
    var minuscula = false;
    var maiuscula = false;
    var espaco = false;

    if (!senha) {
        mensagemErro = `Insira uma senha para continuar<br>`
    }
    if (senha.length < 6) {
        mensagemErro += `Senha muito curta! A senha deve ter pelo menos 6 caracteres<br>`
    } else if (senha.length > 30) {
        mensagemErro += `Senha muito longa! A senha deve ter no máximo 30 caracteres<br>`
    }

    for (i = 0; i < senha.length; i++) {
        for (j = 0; j < caracteres.length; j++) {

            if (senha[i] == caracteres[j]) {
                especiais = true;
            } if (!isNaN(senha[i])) {
                numero = true;
            } if (senha[i].toUpperCase() != senha[i]) {
                minuscula = true;
            } if (senha[i].toLowerCase() != senha[i]) {
                maiuscula = true;
            } if (senha[i].includes(' ')) {
                espaco = true;
            }
        }
    }

    if (!especiais) {
        mensagemErro += `A senha deve incluir ao menos um caracter especial<br>`
    }
    if (!numero) {
        mensagemErro += `A senha deve incluir ao menos um número<br>`
    }
    if (!minuscula) {
        mensagemErro += `A senha deve incluir ao menos uma letra minúscula<br>`
    }
    if (!maiuscula) {
        mensagemErro += `A senha deve incluir ao menos uma letra maiúscula<br>`
    }
    if (espaco) {
        mensagemErro += `A senha não pode incluir espaços em branco<br>`
    }

    divmsg.innerHTML = mensagemErro

    if (especiais && numero && minuscula && maiuscula && !espaco) {
        return true;
    }


}

function logar() {
    const codigo = document.getElementById('iptcodigo').value;
    const email = document.getElementById('iptemail').value;
    const senha = document.getElementById('iptsenha').value;
    const modalLogin = document.querySelector('.modalLogin');
    const modalErroLogin = document.querySelector('.modalErroLogin');
    const btnProsseguir = document.querySelector('.continuar');
    const btnTentar = document.querySelector('.tentar-novamente');

    if (validarEmail() && validarSenha()) {

        fetch("/usuarios/autenticar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha,
                codigoServer: codigo,
            })
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!");

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);

                    // Armazena os valores no sessionStorage
                    sessionStorage.NOME_EMPRESA = json.nome_empresa;
                    sessionStorage.CARGO_FUNCIONARIO = json.cargo_func;
                    sessionStorage.ID_FUNCIONARIO = json.id_func;
                    sessionStorage.ID_EMPRESA = json.id_empresa;
                    sessionStorage.NOME_USUARIO = json.nome_func;
                    sessionStorage.EMAIL_USUARIO = email;
                    modalLogin.style.display = 'block';

                    btnProsseguir.addEventListener("click", () => {

                        setTimeout(function () {
                            if (sessionStorage.CARGO_FUNCIONARIO == "Gestor") {
                                window.location.href = "../root/contaEmpresaRootFuncionarios.html";
                                modalLogin.style.display = 'none';
                            }
                            else if (sessionStorage.CARGO_FUNCIONARIO == "Analista de Infraestrutura") {
                                window.location.href = "../user/dashboard.html";
                            }
                            else if (sessionStorage.CARGO_FUNCIONARIO == "Ciêntista de Dados") {
                                window.location.href = "../user/dashboardCientista.html";
                            }
                        }, 2000); // apenas para exibir o loading

                    })

                });

            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                modalErroLogin.style.display = 'block';
                btnTentar.addEventListener("click", () => modalErroLogin.style.display = 'none');

                resposta.text().then(texto => {
                    console.error(texto);
                    finalizarAguardar(texto);
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        });

        return false;


    }
}
