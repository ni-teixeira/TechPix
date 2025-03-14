document.addEventListener("DOMContentLoaded", function () {

    const modal = document.querySelector('.modal');
    const botoesVisualizar = document.querySelectorAll('.btn-visualizar');

    const switchModal = () => {
        if (modal.style.display == 'block') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'block';
        }
        console.log("modal atualizado");
    };

    botoesVisualizar.forEach(button => {
        button.addEventListener('click', function () {
            switchModal();
        });
    });

    window.onclick = function (event) {
        if (event.target === modal) {
            switchModal();
        }
    };

});

function carregarGraficos() {
    const graficosPizza = [
        { id: 'pizza1', data: [80, 100], label: 'Porcentagem da CPU' },
        { id: 'pizza2', data: [60, 90], label: 'Armazenamento' },
        { id: 'pizza3', data: [40, 20], label: 'Memoria Swap' },
        { id: 'pizza4', data: [20, 90], label: 'RAM' }
    ];

    const graficosLinhas = [
        { id: 'linha1', data: [80, 100], label: 'Frequencia da CPU' },
        { id: 'linha2', data: [60, 90], label: 'Interrupções' },
        { id: 'linha3', data: [40, 20], label: 'Interrupções' },
        { id: 'linha4', data: [20, 90], label: 'Pacotes enviados' },
        { id: 'linha5', data: [20, 90], label: 'Pacotes recebidos' }
    ];

    graficosPizza.forEach(grafico => {
        const ctx = document.getElementById(grafico.id);
        new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    label: grafico.label,
                    data: grafico.data,
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
                                size: 18
                            }
                        }
                    }
                }
            }
        });
    });


    graficosLinhas.forEach(grafico => {
        const ctx = document.getElementById(grafico.id);
        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: grafico.label,
                    data: grafico.data,
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
                                size: 18
                            }
                        }
                    }
                }
            }
        });
    });

}