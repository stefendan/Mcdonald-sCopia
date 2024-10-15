        // Pega o endereço salvo no localStorage
        const enderecoSalvo = localStorage.getItem('endereco');

        // Atualiza o campo de endereço se existir um endereço salvo
        if (enderecoSalvo) {
            document.getElementById('endereco-entrega').textContent = enderecoSalvo;
        }

        // Pega o formulário de endereço
        const form = document.getElementById('form-endereco');

        form.addEventListener('submit', function(event) {
            event.preventDefault();  // Impede o envio padrão do formulário

            // Coleta os valores do formulário
            const nome = document.getElementById('nome').value;
            const endereco = document.getElementById('endereco').value;
            const numero = document.getElementById('numero').value;
            const bairro = document.getElementById('bairro').value;
            const cidade = document.getElementById('cidade').value;
            const estado = document.getElementById('estado').value;
            const cep = document.getElementById('cep').value;

            // Monta o endereço completo
            const enderecoCompleto = `${endereco}, ${numero}, ${bairro}, ${cidade}, ${estado} - CEP: ${cep}`;

            // Armazena no localStorage
            localStorage.setItem('endereco', enderecoCompleto);

            // Redireciona para a página do carrinho
            window.location.href = './carrinho.html';
        });