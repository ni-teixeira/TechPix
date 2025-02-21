document.addEventListener("DOMContentLoaded", function () {
    function mostrarMetricas(id) {
        let todasMetricas = document.querySelectorAll('.metricas');
        let painelTexto = document.getElementById('tituloDashboard');

        todasMetricas.forEach(metrica => metrica.style.display = 'none');
        document.getElementById('metricas-' + id).style.display = 'block';
        painelTexto.style.display = 'none'; // Esconde o texto "Painel de Estatísticas"

        renderizarGraficos(id);
    }

    function renderizarGraficos(id) {
        let ctxBarra = document.getElementById(`graficoBarra${id}`).getContext('2d');
        let ctxRosca = document.getElementById(`graficoRosca${id}`).getContext('2d');

        new Chart(ctxBarra, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Desempenho',
                    data: [80, 75, 78, 85, 90, 76],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)'
                }]
            }
        });

        new Chart(ctxRosca, {
            type: 'doughnut',
            data: {
                labels: ['Eficiente', 'Ineficiente'],
                datasets: [{
                    data: [85, 15],
                    backgroundColor: ['green', 'red']
                }]
            }
        });
    }

    window.mostrarMetricas = mostrarMetricas;
});
