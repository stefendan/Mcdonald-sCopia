let precosLanches = {
    'lanche_1': 23.90,  // Preço do McChicken
    'lanche_2': 25.90   // Preço do Big Mac
};
let precosBebidas = {
    'bebida_1': 13.90,  // Preço do fanta-guarana
    'bebida_2': 12.90   // Preço do fanta-laranja
};
let precosSobremesas = {
    'sobremesa_1': 11.90,  // Preço do Top Sundae Caramelo
    'sobremesa_2': 16.90   // Preço do McFlurry Choco&Cream Kopenhagen
};
let total = parseFloat(localStorage.getItem('total')) || 0; 
let totalItens = localStorage.getItem('totalItens') || 0; 
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];


function atualizarPrecoTotal() {
    const totalElemento = document.querySelector('.preco-total');
    totalElemento.textContent = `R$ ${total.toFixed(2)}`;
    const totalCarrinhoElemento = document.querySelector('.preco-total-carrinho');
    totalCarrinhoElemento.textContent = `R$ ${total.toFixed(2)}`;

    localStorage.setItem('total', total.toFixed(2));
}
function atualizarTotalItens(){
    const totalItensElemento = document.querySelector('.total-itens');
    totalItensElemento.textContent = `${totalItens}`;

    localStorage.setItem('totalItens', totalItens);
}
function resetarTotal() {
    totalItens =0;
    total = 0;  
    atualizarPrecoTotal(); 
    atualizarTotalItens();
    localStorage.setItem('totalItens', totalItens);
    localStorage.setItem('total', total.toFixed(2));  
    localStorage.removeItem('carrinho');
}

function adicionarItem(produtoId) {
    if (precosLanches[produtoId]) {
        total += precosLanches[produtoId];
    } else if (precosBebidas[produtoId]) {
        total += precosBebidas[produtoId];
    } else {
        total += precosSobremesas[produtoId];
    } 
    atualizarPrecoTotal();
}

function removerItem(produtoId) {
    if (precosLanches[produtoId]) {
        total -= precosLanches[produtoId];
    } else if (precosBebidas[produtoId]) {
        total -= precosBebidas[produtoId];
    } else {
        total -= precosSobremesas[produtoId];
    } 
    atualizarPrecoTotal();
}

function adicionarTotalItens(){
    totalItens ++;
    atualizarTotalItens();
}
function removerTotalItens(){
    totalItens --;
    atualizarTotalItens();
}

// menu
document.querySelectorAll('.produto span').forEach((span) => {
    span.addEventListener('click', () => {
        console.log(document.querySelector('#seletorDoElemento'));
        const produtoId = span.getAttribute('id'); 
        adicionarItem(produtoId);  
        adicionarTotalItens();

        const nomeProduto = span.querySelector('p').textContent;
        const precoProduto = precosLanches[produtoId] || precosBebidas[produtoId] || precosSobremesas[produtoId] || 0;

        adicionarItemCarrinho(nomeProduto, precoProduto, produtoId);
    });
});

// carrinho
function adicionarItemCarrinho(nome, preco, produtoId) {
    const itemPedidoDiv = document.createElement('div');
    itemPedidoDiv.classList.add('itens-pedido');

    const itemInfoDiv = document.createElement('div');
    itemInfoDiv.classList.add('item-info');

    const img = document.createElement('img');

    if (produtoId.startsWith('lanche')) {
        img.src = `../../img/Sanduiches/${produtoId}_icon.png`;  // Caminho lanche
    } else if (produtoId.startsWith('bebida')) {
        img.src = `../../img/Bebidas/${produtoId}_icon.png`;     // Caminho bebida
    } else if (produtoId.startsWith('sobremesa')) {
        img.src = `../../img/Sobremesas/${produtoId}_icon.png`;  // Caminho sobremesa
    }
    img.alt = `Imagem do ${nome}`;

    const nomeDiv = document.createElement('div');
    const nomeP = document.createElement('p');
    nomeP.classList.add('nome-item');
    nomeP.textContent = nome;
    nomeDiv.appendChild(nomeP);

    itemInfoDiv.appendChild(img);
    itemInfoDiv.appendChild(nomeDiv);

    const precoItemDiv = document.createElement('div');
    precoItemDiv.classList.add('preco-item');

    const precoSpan = document.createElement('span');
    precoSpan.classList.add('preco');
    precoSpan.textContent = `R$ ${preco.toFixed(2)}`;

    const quantidadeDiv = document.createElement('div');
    quantidadeDiv.classList.add('quantidade-item');

    const excluirButton = document.createElement('button');
    excluirButton.classList.add('excluir-item');
    excluirButton.setAttribute('data-produto-id', produtoId);

    const excluirIcon = document.createElement('img');
    excluirIcon.src = '../../img/Pedidos/excluirIcone.svg';
    excluirIcon.alt = 'Ícone excluir';
    excluirIcon.classList.add('icone-excluir');
    excluirButton.appendChild(excluirIcon);

    const quantidadeSpan = document.createElement('span');
    quantidadeSpan.textContent = '1'; 

    const adicionarButton = document.createElement('button');
    adicionarButton.classList.add('adicionar-item');
    adicionarButton.setAttribute('data-produto-id', produtoId);

    const adicionarIcon = document.createElement('img');
    adicionarIcon.src = '../../img/Pedidos/adicionarIcone.svg';
    adicionarIcon.alt = 'Ícone adicionar';
    adicionarIcon.classList.add('icone-adicionar');
    adicionarButton.appendChild(adicionarIcon);

    quantidadeDiv.appendChild(excluirButton);
    quantidadeDiv.appendChild(quantidadeSpan);
    quantidadeDiv.appendChild(adicionarButton);

    precoItemDiv.appendChild(precoSpan);
    precoItemDiv.appendChild(quantidadeDiv);

    itemPedidoDiv.appendChild(itemInfoDiv);
    itemPedidoDiv.appendChild(precoItemDiv);

    const pedidosDiv = document.querySelector('.pedidos');
    pedidosDiv.appendChild(itemPedidoDiv);

 

    adicionarButton.addEventListener('click', () => {
        let quantidade = parseInt(quantidadeSpan.textContent);
        quantidade++;  
        quantidadeSpan.textContent = quantidade;
        adicionarItem(produtoId);
        adicionarTotalItens();

        if (quantidade > 0) {
            excluirIcon.src = '../../img/Pedidos/subtrairIcone.svg';
            excluirIcon.alt = 'Ícone diminuir';
        }
        salvarCarrinho();
    });

    excluirButton.addEventListener('click', () => {
        let quantidade = parseInt(quantidadeSpan.textContent);
        quantidade--;
        quantidadeSpan.textContent = quantidade;
        removerItem(produtoId);
        removerTotalItens();
        if (quantidade === 1) {
            excluirIcon.src = '../../img/Pedidos/excluirIcone.svg';
            excluirIcon.alt = 'Ícone excluir'
        }
        if(quantidade < 1) {
            pedidosDiv.removeChild(itemPedidoDiv);
        }
        salvarCarrinho();
    });
}
function salvarCarrinho() {
    const carrinho = [];
    document.querySelectorAll('.item-pedido').forEach((itemPedidoDiv) => {
        const nome = itemPedidoDiv.querySelector('.nome-item').textContent;
        const preco = parseFloat(itemPedidoDiv.querySelector('.preco').textContent.replace('R$', ''));
        const quantidade = parseInt(itemPedidoDiv.querySelector('.quantidade-item span').textContent);
        const produtoId = itemPedidoDiv.querySelector('.adicionar-item').getAttribute('data-produto-id');

        carrinho.push({
            nome,
            preco,
            quantidade,
            produtoId
        });
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}
function restaurarCarrinho() {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinhoSalvo.forEach((item) => {
        for (let i = 0; i < item.quantidade; i++) {
            adicionarItemCarrinho(item.nome, item.preco, item.produtoId);
        }
    });
}
document.querySelector('.limpar').addEventListener('click', () => {
    const pedidosDiv = document.querySelector('.pedidos');

    while (pedidosDiv.children.length > 1) {
        pedidosDiv.removeChild(pedidosDiv.lastChild);
    }

    resetarTotal();
    salvarCarrinho();
});

function salvarPaginaAtual() {
    localStorage.setItem('paginaAnterior', window.location.href);
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarPrecoTotal();
    atualizarTotalItens();
    restaurarCarrinho();
});