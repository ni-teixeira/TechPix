const id = sessionStorage.ID_USUARIO;
const modal = document.getElementById("modal");

function sair() {
    sessionStorage.removeItem(EMAIL_USUARIO);
    sessionStorage.removeItem(ID_USUARIO);
    sessionStorage.removeItem(NOME_USUARIO);
}

function cadastrar() {
    modal.style.display = 'flex';
    modal.showModal();
    modal.style.width = 45 + "%";
    modal.style.height = 75 + "%";

    modal.innerHTML = `
        <div class="superior-modal">
            <div class="esquerda-superior-modal">
                <div class="circulo_imagem-modal">
                    <img src="../assets/icon/cadastrar.svg" alt="" style="width: 70%; height:70%">
                </div>
                <span class="titulo_pagina">Cadastrar</span>
            </div>
            <div class="direita-superior-modal">
                <img class="close" src="../assets/icon/close.svg" alt="" onclick="closeModal()">
            </div>
        </div>
        <div class="inferior-modal">
            <div class="esquerda-inferior-modal">
                <div class="formulario">
                    <span class="descricao-modal">Nome Completo:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_nome">
                </div>
                <div class="formulario">
                    <span class="descricao-modal">Email:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_email">
                </div>
                <div class="formulario">
                    <span class="descricao-modal">Cargo:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_cargo">
                </div>
                <div class="formulario">
                    <span class="descricao-modal">Equipe:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_equipe">
                </div>
            </div>
            <div class="direita-inferior-modal">
                <div class="borda-imagem">
                    <span class="descricao-modal">Foto de Perfil: <span class="obrigatorio">*</span></span>
                    <div class="regiao-foto">
                        <div class="fundo-imagem">
                            <img class="upload-imagem" src="../assets/icon/upload.svg" alt="" style="width: 50%; height:50%">
                        </div>
                    </div>
                </div>
                <div class="regiao-botao">
                    <button class="botao-modal" onclick="enviarCadastro()">Cadastrar</button>
                </div>
            </div>
        </div>
    `;
}

function enviarCadastro() {
    const nome = ipt_nome.value;
    const email = ipt_email.value;
    const cargo = ipt_cargo.value;
    const equipe = ipt_equipe.value;
    const idEmpresa = id

    // validacao

    fetch("/empresas/cadastrarFuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            cargoServer: cargo,
            equipeServer: equipe,
            fkEmpresaServer: idEmpresa
        })
    }).then(function (resultado) {
        console.log(resultado);
        mostrarCards();
    })
}

function ativarFiltro(atividade) {
    let ativacao = atividade;

    if(ativacao == 0) {
        div_preferencias.innerHTML = `
            <img src="../assets/icon/filtroAtivo.svg" alt="" onclick="ativarFiltro(1)">
            <select class="select-filtro" id="slt_tipo" onchange="trocarSegundoFiltro()">
                <option value="nome" selected>Nome Completo</option>
                <option value="email">Email</option>
                <option value="cargo">Cargo</option>
                <option value="equipe">Equipe</option>
            </select>
            <select class="select-filtro" id="slt_categoria" oninput="mostrarCards(1, 1)">
                <option value="ASC" selected>A-Z</option>
                <option value="DESC">Z-A</option>
            </select>
        `;
    } else {
        div_preferencias.innerHTML = `
            <img src="../assets/icon/filtroDesativado.svg" alt="" onclick="ativarFiltro(0)">
        `;
    }
}

function trocarSegundoFiltro() {
    let selecionado = slt_tipo.value;

    if(selecionado == "nome") {
        slt_categoria.innerHTML = `
            <option value="ASC" selected>A-Z</option>
            <option value="DESC">Z-A</option>
        `;
    } else {
        fetch(`/empresas/${selecionado}/${id}/filtro`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta){
            slt_categoria.innerHTML = "";

            resposta.json()
            .then(json => {
                let vetorEmail = [];
                for(let i = 0; i < (json.lista).length; i++) {
                    let opcaoAtual = (json.lista[i]).Cargo ;
                    let confirmacao = 0;
                    let mensagem = "";

                    for(let ind = 0; ind < opcaoAtual.length; ind++) {
                        if(opcaoAtual[ind] == "@" && !vetorEmail.includes()) {
                            vetorEmail.push(opcaoAtual)
                            confirmacao = 1
                            mensagem += "@"
                        } else if(confirmacao == 1) {
                            mensagem += opcaoAtual[ind]
                        }
                    }
                    slt_categoria.innerHTML += `<option value="${mensagem}">${mensagem}</option>`;
                }
            })
        })
    }
}

function carregarHorario() {
    let horario = document.getElementById('horario');
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth()

    if(dia < 10) {
        dia = dia.toString();
        dia = '0' + dia;
    }

    if(mes < 10) {
        mes += 1;
        mes = mes.toString();
        mes = '0' + mes;
    }

    let mensagem = dataAtual.getHours() + ":" + dataAtual.getMinutes() + " " + dia + "/" + mes + "/" + dataAtual.getFullYear();
    horario.innerHTML = mensagem;
}

function mostrarCards(search, filtro) {
    carregarHorario();

    div_cards.innerHTML = "";   

    if(search == undefined && filtro == undefined) {
        fetch(`/empresas/${id}/procurarCards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            let tela = document.getElementById("div_inferior");
            let tamHorizontal =  tela.clientWidth;
            let cards = 0;

            if(tamHorizontal <= 400) {
                cards = 1;
            } else if(tamHorizontal <= 1000) {
                cards = 2;
            } else if(tamHorizontal <= 1466) {
                cards = 3;
            } else {
                cards = 4;
            }

            console.log(cards +  " " + tamHorizontal);
    
            resposta.json()
            .then(json => {

                let div = document.getElementById("div_cards");
                for(let i = 0; i < (json.lista).length; i++) {
                    let pessoaAtual = (json.lista[i])
                
                div_cards.innerHTML += `
                    <div class="cardMaior">
                        <div class="cabecalho-card">
                            <div class="esquerda-cabecalho-card">
                                <img class="imagem-perfil-card" src="../assets/imgs/empresario.jpg" alt="">
                                <span class="titulo-card" id="spn_nome">${pessoaAtual.nome}</span>
                            </div>
                            <div class="circulo_icone">
                                <img class="icone-edit" onclick="editar('${pessoaAtual.nome}', '${pessoaAtual.email}', '${pessoaAtual.cargo}', '${pessoaAtual.equipe}', ${pessoaAtual.id})" src="../assets/icon/edit.svg" alt="">
                            </div>
                        </div>
                        <div class="cardMenor">
                            <span class="textoCard">Email:</span>
                            <span class="textoCard" id="spn_email">${pessoaAtual.email}</span>
                            <span class="textoCard">Cargo:</span>
                            <span class="textoCard" id="spn_cargo">${pessoaAtual.cargo}</span>
                            <span class="textoCard">Equipe:</span>
                            <span class="textoCard" id="spn_equipe">${pessoaAtual.equipe}</span>
                        </div>
                    </div>
                `;

                if((i + 1) % cards == 0 && i != 0) {
                    div_inferior.innerHTML += "<br>"
                }

                }
            })
        })
    } else if(filtro == undefined) {
        let mensagem = ipt_search.value;
        if(mensagem == "") {
            mensagem = 1;
        }
    
        fetch(`/empresas/${mensagem}/${id}/search`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(function (resposta) {
            
            resposta.json()
                .then(json => {
                    for(let i = 0; i < (json.lista).length; i++) {
                        let pessoaAtual = (json.lista[i])
                    
                    div_cards.innerHTML += `
                        <div class="cardMaior">
                            <div class="cabecalho-card">
                                <div class="esquerda-cabecalho-card">
                                    <img class="imagem-perfil-card" src="../assets/imgs/empresario.jpg" alt="">
                                    <span class="titulo-card" id="spn_nome">${pessoaAtual.nome}</span>
                                </div>
                                <div class="circulo_icone">
                                    <img class="icone-edit" onclick="editar('${pessoaAtual.nome}', '${pessoaAtual.email}', '${pessoaAtual.cargo}', '${pessoaAtual.equipe}', ${pessoaAtual.id})" src="../assets/icon/edit.svg" alt="">
                                </div>
                            </div>
                            <div class="cardMenor">
                                <span class="textoCard">Email:</span>
                                <span class="textoCard" id="spn_email">${pessoaAtual.email}</span>
                                <span class="textoCard">Cargo:</span>
                                <span class="textoCard" id="spn_cargo">${pessoaAtual.cargo}</span>
                                <span class="textoCard">Equipe:</span>
                                <span class="textoCard" id="spn_equipe">${pessoaAtual.equipe}</span>
                            </div>
                        </div>
                    `;
                    }
            })
        })
    } else {
        let filtro = slt_categoria.value;
        let tipo = slt_tipo.value;
    
        fetch(`/empresas/${id}/${tipo}/${filtro}/pesquisarFiltro`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
    
            resposta.json()
            .then(json => {

                for(let i = 0; i < (json.lista).length; i++) {
                    let pessoaAtual = (json.lista[i])
                
                div_cards.innerHTML += `
                    <div class="cardMaior">
                        <div class="cabecalho-card">
                            <div class="esquerda-cabecalho-card">
                                <img class="imagem-perfil-card" src="../assets/imgs/empresario.jpg" alt="">
                                <span class="titulo-card" id="spn_nome">${pessoaAtual.nome}</span>
                            </div>
                            <div class="circulo_icone">
                                <img class="icone-edit" onclick="editar('${pessoaAtual.nome}', '${pessoaAtual.email}', '${pessoaAtual.cargo}', '${pessoaAtual.equipe}', ${pessoaAtual.id})" src="../assets/icon/edit.svg" alt="">
                            </div>
                        </div>
                        <div class="cardMenor">
                            <span class="textoCard">Email:</span>
                            <span class="textoCard" id="spn_email">${pessoaAtual.email}</span>
                            <span class="textoCard">Cargo:</span>
                            <span class="textoCard" id="spn_cargo">${pessoaAtual.cargo}</span>
                            <span class="textoCard">Equipe:</span>
                            <span class="textoCard" id="spn_equipe">${pessoaAtual.equipe}</span>
                        </div>
                    </div>
                `;
                }
            })
        })
    }
}

function editar(nome, email, cargo, equipe, id) {
    modal.style.display = 'flex';
    modal.showModal();
    modal.style.width = 45 + "%";
    modal.style.height = 70 + "%";
    
    modal.innerHTML = `
        <div class="superior-modal">
            <div class="esquerda-superior-modal">
                <div class="circulo_imagem-modal">
                    <img src="../assets/icon/edit.svg" alt="" style="width: 50%; height:50%">
                </div>
                <span class="titulo_pagina">Editar</span>
                <div class="circulo_imagem-modal-v">
                    <img src="../assets/icon/remove.svg" alt="" class="icon" onclick="deleteModal(${id}, '${nome}')">
                </div>
            </div>
            <div class="direita-superior-modal">
                <img class="close" src="../assets/icon/close.svg" alt="" onclick="closeModal()">
            </div>
        </div>
        <div class="inferior-modal">
            <div class="esquerda-inferior-modal">
                <div class="formulario">
                    <span class="descricao-modal">Nome Completo:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_nome" value="${nome}">
                </div>
                <div class="formulario">
                    <span class="descricao-modal">Email:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_email" value="${email}">
                </div>
                <div class="formulario">
                    <span class="descricao-modal">Cargo:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_cargo" value="${cargo}">
                </div>
                <div class="formulario">
                    <span class="descricao-modal">Equipe:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_equipe" value="${equipe}">
                </div>
            </div>
            <div class="direita-inferior-modal">
                <div class="borda-imagem">
                    <span class="descricao-modal">Foto de Perfil: <span class="obrigatorio">*</span></span>
                    <div class="regiao-foto">
                        <div class="fundo-imagem">
                            <img class="upload-imagem" src="../assets/imgs/empresario.jpg" alt="">
                        </div>
                    </div>
                </div>
                <div class="regiao-botao">
                    <button class="botao-modal" onclick="enviarEdicao(${id})">Editar</button>
                </div>
            </div>
        </div>
    `;

}

function enviarEdicao(id) {
    const idFuncionario = id;
    const nome = document.getElementById("ipt_nome");
    const email = document.getElementById("ipt_email");
    const cargo = document.getElementById("ipt_cargo");
    const equipe = document.getElementById("ipt_equipe");

    const nomeValue = nome.value;
    const emailValue = email.value;
    const cargoValue = cargo.value;
    const equipeValue = equipe.value;
    console.log(idFuncionario);

    fetch("/empresas/atualizarFuncionario", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idFuncionarioServer: idFuncionario,
            nomeServer: nomeValue,
            emailServer: emailValue,
            cargoServer: cargoValue,
            equipeServer: equipeValue
        })
    }).then(function (resultado) {
        console.log(resultado);
        mostrarCards();
        closeModal();
            modal.style.width = 45 + "%";
            modal.style.height = 55 + "%";
            modal.innerHTML = `
            <div class="superior-modal">
                <div class="esquerda-superior-modal">
                    <div class="circulo_imagem-modal">
                        <img src="../assets/icon/edit.svg" alt="" style="width: 50%; height:50%">
                    </div>
                    <span class="titulo_pagina">Editar</span>
                    <div class="circulo_imagem-modal-v">
                        <img src="../assets/icon/remove.svg" alt="" class="icon">
                    </div>
                </div>
                <div class="direita-superior-modal">
                    <img class="close" src="../assets/icon/close.svg" alt="" onclick="closeModal()">
                </div>
            </div>
            `;
        })
}

function deleteModal(idFuncionario, nome) {
    modal.style.display = 'flex';
    modal.showModal();
    modal.style.width = 35 + "%";
    modal.style.height = 40 + "%";

    modal.innerHTML = `
        <div class="superior-modal">
            <div class="esquerda-superior-modal">
                <div class="circulo_imagem-modal-excluir">
                    <img src="../assets/icon/remover-vermelho.svg" alt="" style="width: 70%; height:70%">
                </div>
                <span class="titulo_modal_excluir">Excluir</span>
            </div>
            <div class="direita-superior-modal">
                <img class="close" src="../assets/icon/close-vermelho.svg" alt="" onclick="closeModal()">
            </div>
        </div>
        <div class="inferior-modal-excluir">
            <span class="mensagem-excluir">Deseja mesmo excluir o funcionário ${nome}</span>
            <div class="area-botao-excluir">
                <button class="botao-modal-excluir" onclick="enviarDelete(${idFuncionario})">Confirmar</button>
            </div>
        </div>
    `;
}

function enviarDelete(idFuncionario) {
    console.log(idFuncionario);

    fetch(`/empresas/removerFuncionario`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idFuncionarioServer: idFuncionario
        })
    }).then(function (resultado){
        console.log(resultado);
        mostrarCards();
        closeModal();
    })
}

function closeModal() {
    modal.style.display = 'none';
    modal.close();
}

// window.addEventListener("resize", mostrarCards, false);