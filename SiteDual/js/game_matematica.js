let score = 0; // Pontuação inicial
let num1, num2, correctAnswer; // Variáveis para armazenar os números da pergunta e a resposta correta

// Função para gerar uma nova pergunta
function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1; // Gera um número aleatório entre 1 e 10
    num2 = Math.floor(Math.random() * 10) + 1; // Gera outro número aleatório entre 1 e 10
    correctAnswer = num1 + num2; // Calcula a resposta correta
    document.getElementById('question').textContent = `Quanto é ${num1} + ${num2}?`; // Exibe a pergunta no elemento com id 'question'
    document.getElementById('answer').value = ''; // Limpa o campo de resposta
    document.getElementById('feedback').textContent = ''; // Limpa o feedback anterior
}

// Função para verificar a resposta do usuário
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value); // Obtém a resposta do usuário e converte para número inteiro
    if (userAnswer === correctAnswer) { // Se a resposta do usuário estiver correta
        alert("Você acertou!"); // Exibe um alerta de sucesso

        // Atualiza a pontuação
        score += 10; // Incrementa a pontuação em 10
        localStorage.setItem('score', score); // Armazena a nova pontuação no localStorage

        // Atualiza o score na lista de dados (supondo que você tem objetos com CPFs armazenados)
        const cpf = localStorage.getItem('cpf'); // Obtém o CPF do usuário do localStorage
        const lista_dados = JSON.parse(localStorage.getItem('pessoa')) || []; // Obtém a lista de dados do localStorage, ou um array vazio se não existir
      
        // Procura o usuário correspondente pelo CPF e atualiza a pontuação
        for (let i = 0; i < lista_dados.length; i++) {
            if (cpf === lista_dados[i].cpf) {
                lista_dados[i].score = score; // Atualiza a pontuação do usuário
                break; // Interrompe o loop assim que encontrar o CPF correspondente
            }
        }

        const dadosJSON = JSON.stringify(lista_dados); // Converte a lista de dados atualizada para JSON
        localStorage.setItem('pessoa', dadosJSON); // Armazena a lista de dados atualizada no localStorage

        document.getElementById('feedback').textContent = 'Correto!'; // Exibe feedback positivo
    } else { // Se a resposta do usuário estiver incorreta
        alert(`Você errou! O correto seria ${num1 + num2}`); // Exibe um alerta com a resposta correta
        document.getElementById('feedback').textContent = 'Incorreto, tente novamente!'; // Exibe feedback negativo
    }
    
    document.getElementById('score').textContent = score; // Atualiza a exibição da pontuação na página
    generateQuestion(); // Gera uma nova pergunta após cada resposta
}

// Inicializa o jogo gerando a primeira pergunta
generateQuestion();
