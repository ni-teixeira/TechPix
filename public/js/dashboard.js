const id = sessionStorage.ID_FUNCIONARIO;

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
        { id: 'linha1', data: [80, 100, 20, 50, 10, 60, 120], label: 'Frequencia da CPU', labels: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']},
        { id: 'linha2', data: [0, 1, 0, 2, 0, 0, 0], label: 'Interrupções', labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']},
        { id: 'linha3', data: [50, 55, 65, 54, 52, 58, 49], label: 'Interrupções', labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']},
        { id: 'linha4', data: [100, 100, 110, 110, 120, 120, 130], label: 'Pacotes enviados', labels: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']},
        { id: 'linha5', data: [85, 94, 84, 97, 78, 40, 140], label: 'Pacotes recebidos', labels: ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']}
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
                labels: grafico.labels,
                datasets: [{
                    label: grafico.label,
                    data: grafico.data,
                    backgroundColor: ['#4868A5'],
                    borderColor: '#4868A5',
                    borderWidth: 2
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

function carregarDados() {
    carregarGraficos();
    nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;
}