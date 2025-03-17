const id = sessionStorage.ID_EMPRESA;
razao.innerHTML = sessionStorage.NOME_USUARIO;
const modal = document.getElementById("modal");

function sair() {
    sessionStorage.removeItem(EMAIL_USUARIO);
    sessionStorage.removeItem(ID_FUNCIONARIO);
    sessionStorage.removeItem(NOME_USUARIO);
}

function cadastrar() {
    modal.style.display = 'flex';
    modal.showModal();
    console.log(window.innerWidth);

    if(window.innerWidth <= 1000) {
        modal.style.width = 70 + "%";
        modal.style.height = 75 + "%";
    } else {
        modal.style.width = 45 + "%";
        modal.style.height = 75 + "%";
    }

    modal.innerHTML = `
        <div class="superior-modal">
            <div class="esquerda-superior-modal">
                <div class="circulo_imagem-modal">
                    <img class="icon-modal" src="../assets/icon/cadastrar.svg" alt="">
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
                    <span class="descricao-modal">Senha:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_senha">
                </div>
                <div class="formulario">
                    <span class="descricao-modal">Cargo:<span class="obrigatorio">*</span></span>
                    <select class="input-modal"id="ipt_cargo">
                        <option value="" selected disabled>Tipo</option>
                        <option value="Analista de Infraestrutura" >Analista de Infraestrutura</option>
                        <option value="Cientista de Dados" >Cientista de Dados</option>
                    </select>
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
    const senha = ipt_senha.value
    const cargo = ipt_cargo.value;
    const idEmpresa = id

    const senhaMaiusculo = senha.toUpperCase();
    const senhaMinusculo = senha.toLowerCase();

    // validacao
    if(!nome.includes(" ")) {
        alert("É necessário que coloque o nome completo do funcionário");
    } else if(!email.includes("@") || !email.includes(".com")) {
        alert("Por favor insira um email válido");
    } else if(!senha.includes(1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9) || senha == senhaMaiusculo || senha == senhaMinusculo || senha.length <= 8) {
        alert("Por favor insira uma senha válida");
    } else {

    fetch("/empresas/cadastrarFuncionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            cargoServer: cargo,
            senhaServer: senha,
            fkEmpresaServer: idEmpresa
        })
    }).then(function (resultado) {
        console.log(resultado);
        closeModal();
        mostrarCards();
    })
    }
}

function ativarFiltro(atividade) {
    let ativacao = atividade;

    if(ativacao == 0) {
        div_preferencias.innerHTML = `
            <img class="icon_filtro" src="../assets/icon/filtroAtivo.svg" alt="" onclick="ativarFiltro(1)">
            <select class="select-filtro" id="slt_tipo" onchange="trocarSegundoFiltro()">
                <option value="#" selected disabled>Categoria</option>
                <option value="nome" >Nome</option>
                <option value="email">Email</option>
                <option value="cargo">Cargo</option>
            </select>
            <select class="select-filtro" id="slt_categoria" oninput="mostrarCards(1, 1)">
                <option value="#" selected disabled>Tipo</option>
                <option value="ASC">A-Z</option>
                <option value="DESC">Z-A</option>
            </select>
        `;
    } else {
        div_preferencias.innerHTML = `
            <img class="icon_filtro" src="../assets/icon/filtroDesativado.svg" alt="" onclick="ativarFiltro(0)">
        `;
    }
}

function trocarSegundoFiltro() {
    let selecionado = slt_tipo.value;

    if(selecionado == "nome") {
        slt_categoria.innerHTML = `
            <option value="#" selected disabled>Tipo</option>
            <option value="ASC">A-Z</option>
            <option value="DESC">Z-A</option>
        `;
    } else {
        fetch(`/empresas/${selecionado}/${id}/filtro`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta){
            slt_categoria.innerHTML = '<option value="#" selected disabled>Tipo</option>';

            resposta.json()
            .then(json => {
                let vetorEmail = [];
                let vetor = [];
                for(let i = 0; i < (json.lista).length; i++) {
                    let opcaoAtual = (json.lista[i]).Cargo ;
                    let confirmacao = 0;
                    let mensagem = "";
                    let palavra = ""

                        if(opcaoAtual.includes("@")) {
                            for(let ind = 0; ind < opcaoAtual.length; ind++) {
                                if(opcaoAtual[ind] == "@") {
                                    confirmacao = 1;
                                    palavra = "@";
                                } else if(confirmacao == 1) {
                                    palavra += opcaoAtual[ind];
                                }
    
                                if(!vetorEmail.includes(palavra)) {
                                    vetorEmail.push(palavra);
                                    mensagem = palavra;
                                }
                            }
                        } else if(!vetor.includes(opcaoAtual)) {
                            vetor.push(opcaoAtual);
                            mensagem = opcaoAtual;
                        }
                    if(mensagem != "") {
                        slt_categoria.innerHTML += `<option value="${mensagem}">${mensagem}</option>`;
                    }
                }
            })
        })
    }
}

function carregarHorario() {
    let horario = document.getElementById('horario');
    let dataAtual = new Date();
    let minuto = dataAtual.getMinutes();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth();

    if(dia < 10) {
        dia = dia.toString();
        dia = '0' + dia;
    }

    if(mes < 10) {
        mes += 1;
        mes = mes.toString();
        mes = '0' + mes;
    }

    if(minuto < 10) {
        minuto = minuto.toString();
        minuto = '0' + minuto;
    }

    let mensagem = dataAtual.getHours() + ":" + minuto + " " + dia + "/" + mes + "/" + dataAtual.getFullYear();
    horario.innerHTML = mensagem;
}

function mostrarCards(search, filtro) {
    carregarHorario()

    div_inferior.innerHTML = "";   

    if(search == undefined && filtro == undefined) {
        fetch(`/empresas/${id}/procurarCards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (resposta) {
            resposta.json()
            .then(json => {

                for(let i = 0; i < (json.lista).length; i++) {
                    let pessoaAtual = (json.lista[i])
                
                div_inferior.innerHTML += `
                    <div class="cardMaior">
                        <div class="cabecalho-card">
                            <div class="esquerda-cabecalho-card">
                                <img class="imagem-perfil-card" src="../assets/imgs/user.png" alt="">
                                <span class="titulo-card" id="spn_nome">${pessoaAtual.nome}</span>
                            </div>
                            <div class="circulo_icone">
                                <img class="icone-edit" onclick="editar('${pessoaAtual.nome}', '${pessoaAtual.email}', '${pessoaAtual.senha}', '${pessoaAtual.cargo}', ${pessoaAtual.idFuncionario})" src="../assets/icon/edit.svg" alt="">
                            </div>
                        </div>
                        <div class="cardMenor">
                            <span class="textoCard">Email:</span>
                            <span class="textoCard" id="spn_email">${pessoaAtual.email}</span>
                            <span class="textoCard">Senha:</span>
                            <span class="textoCard" id="spn_senha">${pessoaAtual.senha}</span>
                            <span class="textoCard">Cargo:</span>
                            <span class="textoCard" id="spn_cargo">${pessoaAtual.cargo}</span>
                        </div>
                    </div>
                `;

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
                    
                    div_inferior.innerHTML += `
                        <div class="cardMaior">
                            <div class="cabecalho-card">
                                <div class="esquerda-cabecalho-card">
                                    <img class="imagem-perfil-card" src="../assets/imgs/user.png" alt="">
                                    <span class="titulo-card" id="spn_nome">${pessoaAtual.nome}</span>
                                </div>
                                <div class="circulo_icone">
                                    <img class="icone-edit" onclick="editar('${pessoaAtual.nome}', '${pessoaAtual.email}', '${pessoaAtual.senha}', '${pessoaAtual.cargo}', ${pessoaAtual.idFuncionario})" src="../assets/icon/edit.svg" alt="">
                                </div>
                            </div>
                            <div class="cardMenor">
                                <span class="textoCard">Email:</span>
                                <span class="textoCard" id="spn_email">${pessoaAtual.email}</span>
                                <span class="textoCard">Senha:</span>
                                <span class="textoCard" id="spn_senha">${pessoaAtual.senha}</span>
                                <span class="textoCard">Cargo:</span>
                                <span class="textoCard" id="spn_cargo">${pessoaAtual.cargo}</span>
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
                
                div_inferior.innerHTML += `
                    <div class="cardMaior">
                        <div class="cabecalho-card">
                            <div class="esquerda-cabecalho-card">
                                <img class="imagem-perfil-card" src="../assets/imgs/user.png" alt="">
                                <span class="titulo-card" id="spn_nome">${pessoaAtual.nome}</span>
                            </div>
                            <div class="circulo_icone">
                                <img class="icone-edit" onclick="editar('${pessoaAtual.nome}', '${pessoaAtual.email}', '${pessoaAtual.senha}', '${pessoaAtual.cargo}', ${pessoaAtual.idFuncionario})" src="../assets/icon/edit.svg" alt="">
                            </div>
                        </div>
                        <div class="cardMenor">
                            <span class="textoCard">Email:</span>
                            <span class="textoCard" id="spn_email">${pessoaAtual.email}</span>
                            <span class="textoCard">Senha:</span>
                            <span class="textoCard" id="spn_senha">${pessoaAtual.senha}</span>
                            <span class="textoCard">Cargo:</span>
                            <span class="textoCard" id="spn_cargo">${pessoaAtual.cargo}</span>
                        </div>
                    </div>
                `;
                }
            })
        })
    }
}

function editar(nome, email, senha, cargo, id) {
    modal.style.display = 'flex';
    modal.showModal();
    console.log(id);

    if(window.innerWidth <= 1000) {
        modal.style.width = 70 + "%";
        modal.style.height = 75 + "%";
    } else {
        modal.style.width = 45 + "%";
        modal.style.height = 70 + "%";
    }
    
    modal.innerHTML = `
        <div class="superior-modal">
            <div class="esquerda-superior-modal">
                <div class="circulo_imagem-modal">
                    <img class="icon-modal" src="../assets/icon/edit.svg" alt="">
                </div>
                <span class="titulo_pagina">Editar</span>
                <div class="circulo_imagem-modal-v">
                    <img src="../assets/icon/remove.svg" alt="" class="icon-delete" onclick="deleteModal(${id}, '${nome}')">
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
                    <span class="descricao-modal">Senha:<span class="obrigatorio">*</span></span>
                    <input class="input-modal" type="text" id="ipt_senha" value="${senha}">
                </div>
                <div class="formulario">
                    <span class="descricao-modal">Cargo:<span class="obrigatorio">*</span></span>
                    <select class="input-modal" id="ipt_cargo">
                        <option value="Analista de Infraestrutura">Analista de Infraestrutura</option>
                        <option value="Cientista de Dados">Cientista de Dados</option>
                    </select>
                </div>
            </div>
            <div class="direita-inferior-modal">
                <div class="borda-imagem">
                    <span class="descricao-modal">Foto de Perfil: <span class="obrigatorio">*</span></span>
                    <div class="regiao-foto">
                        <div class="fundo-imagem">
                            <img class="upload-imagem" src="../assets/imgs/user.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="regiao-botao">
                    <button class="botao-modal" onclick="enviarEdicao(${id})">Editar</button>
                </div>
            </div>
        </div>
    `;
    ipt_cargo.value = cargo;
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

    if(window.innerWidth <= 1000) {
        modal.style.width = 70 + "%";
        modal.style.height = 18 + "%";
        modal.style.paddingTop = 5 + "%"
    } else {
        modal.style.width = 35 + "%";
        modal.style.height = 40 + "%";
    }
    console.log(idFuncionario);

    modal.innerHTML = `
        <div class="superior-modal">
            <div class="esquerda-superior-modal">
                <div class="circulo_imagem-modal-excluir">
                    <img class="" src="../assets/icon/remover-vermelho.svg" alt="">
                </div>
                <span class="titulo_modal_excluir">Excluir</span>
            </div>
            <div class="direita-superior-modal">
                <img class="close" src="../assets/icon/close-vermelho.svg" alt="" onclick="closeModal()">
            </div>
        </div>
        <div class="inferior-modal-excluir">
            <span class="mensagem-excluir">Deseja mesmo excluir o funcionário ${nome}?</span>
            <div class="area-botao-excluir">
                <button class="botao-modal-excluir" onclick="enviarDelete(${idFuncionario})">Confirmar</button>
            </div>
        </div>
    `;
}

function enviarDelete(idFuncionario) {
    console.log(idFuncionario + "ID");

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
