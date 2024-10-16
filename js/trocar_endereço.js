document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita o envio automático para poder processar os dados

    // Captura os valores do formulário
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const cep = document.getElementById('cep').value;

    // Monta o endereço completo
    const enderecoCompleto = `${nome}, ${endereco}, Nº ${numero}, ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`;

    // Salva o endereço completo no localStorage
    localStorage.setItem('endereco', enderecoCompleto);

    // Redireciona para a página de carrinho (ou outra)
    window.location.href = './carrinho.html';  // Altere para a página correta
});

