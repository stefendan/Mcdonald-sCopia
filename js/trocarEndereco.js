document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const numero = document.getElementById('numero').value;
    const numeroTelefone = document.getElementById('numero-telefone').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    const estado = document.getElementById('estado').value;
    const cep = document.getElementById('cep').value;


    const enderecoCompleto = `${bairro} - ${endereco} ${numero} ${numeroTelefone} ${nome}, ${cidade}, ${estado}, CEP: ${cep}`;
    localStorage.setItem('endereco', enderecoCompleto);
    
    const paginaAnterior = localStorage.getItem('paginaAnterior');
  
    if (paginaAnterior) {
        if (!paginaAnterior.includes('#carrinho')) {
            window.location.href = paginaAnterior + '#carrinho';
        } else {
            window.location.href = paginaAnterior;
        }
    }else {
        window.location.href = '../menu/menu.html';
    }
    localStorage.removeItem('paginaAnterior');
    
});
document.getElementById('voltarCarrinho').addEventListener('click', function (event) {
    event.preventDefault();
    const paginaAnterior = localStorage.getItem('paginaAnterior');
  
    if (paginaAnterior) {
        if (!paginaAnterior.includes('#carrinho')) {
            window.location.href = paginaAnterior + '#carrinho';
        } else {
            window.location.href = paginaAnterior;
        }
    }else {
        window.location.href = '../menu/menu.html';
    }
    localStorage.removeItem('paginaAnterior');
});

