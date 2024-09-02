// Declaração global de CPF (se necessário, você pode declarar aqui)


// Event listener para DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Verifica se o nome está armazenado no localStorage e atualiza o HTML
    let nome_ = localStorage.getItem('nome') || ''; // Obtém o nome do localStorage, ou uma string vazia se não existir
    if (nome_ != '') { // Se o nome não for vazio
        let score_ = localStorage.getItem('score'); // Obtém a pontuação do localStorage
        document.getElementById('nome').textContent = "Olá " + nome_; // Atualiza o elemento com id 'nome' com a saudação
        document.getElementById('score').textContent = "Sua pontuação é " + score_ + "!"; // Atualiza o elemento com id 'score' com a pontuação
    }
    
});

// Outro Event listener para DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm'); // Seleciona o formulário de login pelo id

    // Adiciona um evento de submit ao formulário de login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

        const login = loginForm.elements['login'].value; // Obtém o valor do campo de login
        const senha_login = loginForm.elements['senha_login'].value; // Obtém o valor do campo de senha

        // Obtém a lista de dados do localStorage, ou um array vazio se não existir
        const lista_dados = JSON.parse(localStorage.getItem('pessoa')) || [];
        // Procura um usuário na lista que tenha o mesmo CPF e senha fornecidos
        const usuarioEncontrado = lista_dados.find(user => user.cpf === login && user.senha === senha_login);

        if (usuarioEncontrado) { // Se um usuário for encontrado
            alert('Login bem-sucedido!'); // Exibe uma mensagem de sucesso
            // Filtra a lista para encontrar o usuário com o CPF fornecido
            const capturar = lista_dados.filter(a => { return a.cpf == login });
            if (capturar.length != 0) { // Se o usuário foi encontrado
                console.log("verificando veracidade"); // Log para verificação
                let score = capturar[0].score; // Obtém a pontuação do usuário
                localStorage.setItem('score', score); // Armazena a pontuação no localStorage
                let nome = capturar[0].nome; // Obtém o nome do usuário
                localStorage.setItem('nome', nome); // Armazena o nome no localStorage
                let cpf = capturar[0].cpf; // Obtém o CPF do usuário
                localStorage.setItem('cpf', cpf); // Armazena o CPF no localStorage
            }
            // Atualiza cpf_ para '2' após o login bem-sucedido (não há esta linha no código, mas está no comentário)
            
            // Redirecionar o usuário para outra página ou fazer qualquer outra ação necessária
        } else { // Se o usuário não for encontrado
            alert('Login ou senha incorretos.'); // Exibe uma mensagem de erro
        }

        loginForm.reset(); // Reseta o formulário de login
    });
});
