document.getElementById('voltarCarrinho').addEventListener('click', function (event) {
    event.preventDefault();
    const paginaAnterior = localStorage.getItem('paginaAnterior');
  
    if (paginaAnterior) {
        if (!paginaAnterior.includes('#carrinho')) {
            window.location.href = paginaAnterior + '#carrinho';
        } else {
            window.location.href = paginaAnterior;
        }
    }
    localStorage.removeItem('paginaAnterior');
});