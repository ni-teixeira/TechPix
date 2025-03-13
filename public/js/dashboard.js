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

