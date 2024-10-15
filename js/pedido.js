let precosLanches = {
    'lanche-1': 23.90,  // Preço do McChicken
    'lanche-2': 25.90   // Preço do Big Mac
};
let precosBebidas = {
    'bebida-1': 13.90,  // Preço do fanta-guarana
    'bebida-2': 12.90   // Preço do fanta-laranja
};
let precosSobremesas = {
    'sobremesa-1': 11.90,  // Preço do Top Sundae Caramelo
    'sobremesa-2': 16.90   // Preço do McFlurry Choco&Cream Kopenhagen
};
let total = parseFloat(localStorage.getItem('total')) || 0; 
let totalItens = localStorage.getItem('totalItens') || 0; 


function atualizarPrecoTotal() {
    const totalElemento = document.querySelector('.preco-total');
    totalElemento.textContent = `R$ ${total.toFixed(2)}`;

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
        const produtoId = span.getAttribute('id'); 
        adicionarItem(produtoId);  
        adicionarTotalItens();
    });
});

// carrinho
document.querySelectorAll('.adicionar-item').forEach((botao) => {
    botao.addEventListener('click', () => {
        const produtoId = botao.getAttribute('data-produto-id');
        adicionarItem(produtoId); 
        adicionarTotalItens(); 
    });
});


document.querySelectorAll('.excluir-item').forEach((botao) => {
    botao.addEventListener('click', () => {
        const produtoId = botao.getAttribute('data-produto-id');
        removerItem(produtoId);  
        removerTotalItens();
    });
});

document.querySelector('.limpar').addEventListener('click', () => {
    resetarTotal();
});
atualizarPrecoTotal();
atualizarTotalItens();