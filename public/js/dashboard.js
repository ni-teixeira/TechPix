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
    const graficos = [
        { id: 'donut1', data: [80], label: 'Porcentagem da CPU' },
        { id: 'donut2', data: [60], label: 'Interrupções do sistema' },
        { id: 'donut3', data: [40], label: 'Interrupções de softwares' },
        { id: 'donut4', data: [20], label: 'Frequência da CPU' }
    ];

    graficos.forEach(grafico => {
        const ctx = document.getElementById(grafico.id);
        new Chart(ctx, {
            type: 'doughnut',
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