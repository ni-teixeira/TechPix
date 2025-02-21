function carregarServidor(botao) {
    var painel = document.querySelector(".dashboard");
    var servidor = botao.innerText;
    
    painel.innerHTML = "<h2>" + servidor + "</h2>" +
                       "<p>Status: Online</p>" +
                       "<p>Uso de CPU: " + Math.floor(Math.random() * 100) + "%</p>" +
                       "<p>Uso de Memória: " + Math.floor(Math.random() * 100) + "%</p>";
}

function iniciar() {
    var botao1 = document.getElementById("botao1");
    var botao2 = document.getElementById("botao2");
    var botao3 = document.getElementById("botao3");
    var botao4 = document.getElementById("botao4");
    
    botao1.onclick = function() { carregarServidor(botao1); };
    botao2.onclick = function() { carregarServidor(botao2); };
    botao3.onclick = function() { carregarServidor(botao3); };
    botao4.onclick = function() { carregarServidor(botao4); };
}
