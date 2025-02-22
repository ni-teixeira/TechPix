(function() {
    emailjs.init('RJKvIXvcHc6QANjdS'); // inicializa o emailjs
  })();

  document.querySelector('.botaoEnviar').addEventListener('click', function() { // escuta o clique do botao enviar
    const nome = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const mensagem = document.getElementById('inputDuvidas').value;
    const divmsg = document.getElementById('divmsg');
  
    // verifica se os campos estao vazios
    if (!nome || !email || !mensagem) {
      divmsg.innerHTML = "<br> <p style='color:white;'>Preencha todos os campos!</p>";
      return;
    }
  
    // cria objeto de parametros q sao passados no template
    const params = {
      nome: nome,
      email: email,
      mensagem: mensagem
    };
  
    emailjs.send('service_7j9wchg', 'template_0aefsto', params) // requisicao p enviar
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text); // requisicao bem sucedida
        divmsg.innerHTML = "<br> <p style='color:white;'>Mensagem enviada com sucesso!</p>";
        document.getElementById('inputName').value = ''; // limpa os campos
        document.getElementById('inputEmail').value = '';
        document.getElementById('inputDuvidas').value = '';
      }, function(error) { // caso seja devolvido um erro
        console.error('FAILED...', error);
        divmsg.innerHTML = "<br> <p style='color:white;'>Erro ao enviar a mensagem. Tente novamente.</p>";
      });
  });