function validarLogin(){
    var email = document.getElementById('iptemail').value;
    var mensagemErro = "";
    var tamanhoValido = false;
    
    if(!email){
        mensagemErro = ` `
    }
    if(!email.includes('@')){
        mensagemErro += `O email deve incluir '@'<br>`
    }
    if(!email.includes('.')){
        mensagemErro += `O email deve incluir ponto '.'<br>`
    }
    if(email.includes(' ')){
        mensagemErro += `O email não pode conter espaços<br>`
    }
    if (email.length < 5){
        mensagemErro += `O email deve ter no mínimo 5 caracteres<br>`
    }else if(email.length > 100){
        mensagemErro += `O email deve ter no máximo 100 caracteres<br>`
    }else{
        tamanhoValido = true;
    }

    divmsg.innerHTML = mensagemErro

    if(email.includes('@') && email.includes('.') && !email.includes(' ') && tamanhoValido){
        return true;
    } else {
        return false;
    }

}

function logar(){
    var codigo = document.getElementById('iptcodigo').value;
    var email = document.getElementById('iptemail').value;
    var senha = document.getElementById('iptsenha').value;
    var mensagemErro = "";

    if(!email || !senha || !codigo){
        mensagemErro = "Informe todos os campos!"
    }
    
    if(validarLogin(email)){
        fetch("/usuarios/autenticar", {
            method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha,
                codigoServer: codigo
            }),
        }).then(function (resposta) {
            console.log("ESTOU NO THEN DO entrar()!", resposta)
            
            if (resposta.ok) {
                resposta.json().then(json => {
                    console.log(json);
                    sessionStorage.EMAIL_USUARIO = json.email;
                    sessionStorage.NOME_USUARIO = json.nome;
                    sessionStorage.ID_USUARIO = json.id;
                    alert("Login realizado com sucesso!")
                });
            } else {
                console.log("Houve um erro ao tentar realizar o login!");
                divmsg.innerHTML = mensagemErro;
            }

        }).catch(function (erro) {
            console.log(erro);
        })

        return false;
    }
}