function mostrarMetricas(id) {
    var painelTexto = document.getElementById('tituloDashboard');
    var metricasIniciais = document.getElementById('metricas-iniciais');
    var todasMetricas = document.getElementsByClassName('metricas-container-individual');
    var todosGraficos = document.getElementsByClassName('graficos-wrapper');

    // Esconde métricas iniciais e o título
    if (metricasIniciais !== null) {
        metricasIniciais.style.display = 'none';
    }
    if (painelTexto !== null) {
        painelTexto.style.display = 'none';
    }

    // Esconde todas as métricas individuais e gráficos anteriores
    for (var i = 0; i < todasMetricas.length; i++) {
        todasMetricas[i].style.display = 'none';
    }
    for (var j = 0; j < todosGraficos.length; j++) {
        todosGraficos[j].style.display = 'none';
    }

    // Exibe apenas a métrica do servidor clicado dentro da box individual
    var metricaSelecionada = document.getElementById('metricas-' + id);
    var graficosSelecionados = document.getElementById('graficos-wrapper-' + id);

    if (metricaSelecionada !== null) {
        metricaSelecionada.style.display = 'block'; // Exibe a métrica individual
    }

    if (graficosSelecionados !== null) {
        graficosSelecionados.style.display = 'flex'; // Exibe os gráficos
        graficosSelecionados.style.justifyContent = "center"; // Centraliza as boxes dos gráficos
        graficosSelecionados.style.gap = "20px"; // Mantém um espaço entre os gráficos
    }

    // Renderiza os gráficos dentro das boxes
    renderizarGraficos(id);
}

function renderizarGraficos(id) {
    var ctxBarra = document.getElementById('graficoBarra' + id).getContext('2d');
    var ctxRosca = document.getElementById('graficoRosca' + id).getContext('2d');

    var dadosBarras = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Desempenho',
            data: [80, 75, 78, 85, 90, 76],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
    };

    var dadosRosca = {
        labels: ['Eficiente', 'Ineficiente'],
        datasets: [{
            data: [85, 15],
            backgroundColor: ['green', 'red']
        }]
    };

    // Limpa os gráficos anteriores antes de recriar novos
    if (window['myChartBar' + id]) {
        window['myChartBar' + id].destroy();
    }
    if (window['myChartRosca' + id]) {
        window['myChartRosca' + id].destroy();
    }

    // Criação dos gráficos
    window['myChartBar' + id] = new Chart(ctxBarra, {
        type: 'bar',
        data: dadosBarras
    });

    window['myChartRosca' + id] = new Chart(ctxRosca, {
        type: 'doughnut',
        data: dadosRosca
    });
}
