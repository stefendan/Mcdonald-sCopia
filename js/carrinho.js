document.querySelector('.pedido-sumario').addEventListener('click', function() {
    document.querySelector('.carrinho').classList.add('show');

    document.querySelector('header').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
});

// Fechar o carrinho e mostrar novamente o header, main e footer
document.querySelector('.fechar-carrinho').addEventListener('click', function() {
    document.querySelector('.carrinho').classList.remove('show');

    document.querySelector('header').style.display = 'block';
    document.querySelector('main').style.display = 'block';
    document.querySelector('footer').style.display = 'block';
});