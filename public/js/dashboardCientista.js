const id = sessionStorage.ID_FUNCIONARIO;

function carregarGraficos() {
    const graficoPizza = document.getElementById('pizza');
    const graficoBarra = document.getElementById('barra');

    new Chart(graficoBarra, {
        type: 'bar',
        data: {
            labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            datasets: [{
                label: 'Quantidade de Alertas',
                data: [12, 18, 15, 8, 7, 11, 13],
                backgroundColor: ['#003F6A'],
                borderRadius: 5,
                borderWidth: 1,
                barThickness: 40,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 18
                        }
                    }
                },
                datalabels: {
                    align: 'top',
                    anchor: 'end',
                    color: '#ffffff',
                    font: {
                        weight: 'linear',
                        size: 10
                    },
                    formatter: (value) => value
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff',
                        font: {
                            size: 12
                        }
                    },
                    beginAtZero: true,
                    min: 0,
                    max: 20
                }
            }
        },
        plugins: [ChartDataLabels]
    });

    new Chart(graficoPizza, {
        type: 'pie',
        data: {
            labels: ['Alertas de Atenção', 'Alertas Críticos'],
            datasets: [{
                label: 'Percentual de Alertas',
                data: [19, 12],
                backgroundColor: ['#4868A5', '#899EC9'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            size: 15
                        }
                    }
                },
            }
        }
    });
}

function carregarDados() {
    carregarGraficos();
    nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;
}