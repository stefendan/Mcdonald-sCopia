//lanche

    // Recupera o endereço do localStorage
    const enderecoSalvo = localStorage.getItem('endereco');
    
    // Atualiza o conteúdo do <p> com o endereço salvo
    if (enderecoSalvo) {
        document.querySelector('.endereco-info p').textContent = enderecoSalvo;
    }