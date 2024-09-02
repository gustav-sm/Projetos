let score = 0; // Pontuação inicial
let num1, num2, correctAnswer;

function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    document.getElementById('question').textContent = `Quanto é ${num1} + ${num2}?`;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').textContent = '';
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (userAnswer === correctAnswer) {
        alert("Você acertou!");

        // Atualiza a pontuação
        score += 10;
        localStorage.setItem('score', score);

        // Atualiza o score na lista de dados (supondo que você tem objetos com CPFs armazenados)
        const cpf = localStorage.getItem('cpf');
        const lista_dados = JSON.parse(localStorage.getItem('pessoa')) || [];
      
        for (let i = 0; i < lista_dados.length; i++) {
            if (cpf === lista_dados[i].cpf) {
                lista_dados[i].score = score;
                break; // Interrompe o loop assim que encontrar o CPF correspondente
            }
        }

        const dadosJSON = JSON.stringify(lista_dados);
        localStorage.setItem('pessoa', dadosJSON);

        document.getElementById('feedback').textContent = 'Correto!';
    } else {
        alert(`Você errou! O correto seria ${num1 + num2}`);
        document.getElementById('feedback').textContent = 'Incorreto, tente novamente!';
    }
    
    document.getElementById('score').textContent = score; // Atualiza a exibição do score na página
    generateQuestion(); // Gera uma nova pergunta após cada resposta
}

// Inicializa o jogo gerando a primeira pergunta
generateQuestion();
