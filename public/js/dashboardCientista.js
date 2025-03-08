    function carregarGraficos(){
        const graficoPizza = document.getElementById('pizza');
        const graficoBarra = document.getElementById('barra');
        
        new Chart(graficoBarra, {
        type: 'bar',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
            datasets: [{
                label: 'Quantidade de Alertas',
                data: [12, 20, 15, 8, 7, 11, 13],
                backgroundColor: ['#03C8E4'],
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
                        color: '#ffffff'
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
                        color: '#ffffff'
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        },
        plugins: [ChartDataLabels] 
    });
    
    new Chart(graficoPizza, {
        type: 'pie',
        data: {
            labels: ['Alertas Críticos', 'Alertas Não Críticos'],
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
                    labels: {
                        color: '#ffffff'
                    }
                },
            }
        }
    });
}
    
    