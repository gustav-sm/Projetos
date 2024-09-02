// Seleciona todos os elementos com a classe 'memory-card' e os armazena em uma NodeList
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false; // Variável para verificar se a primeira carta foi virada
let lockBoard = false; // Variável para bloquear o tabuleiro durante o desviramento das cartas
let firstCard, secondCard; // Variáveis para armazenar a primeira e a segunda carta virada
let score = 0; // Variável para armazenar a pontuação do jogador

// Função para aumentar a pontuação
function increaseScore() {
    score += 10; // Incrementa a pontuação
    let valore_atual = parseInt(localStorage.getItem('score')) + score; // Atualiza a pontuação total armazenada no localStorage
    localStorage.setItem('score', valore_atual); // Salva a nova pontuação no localStorage

    // Atualiza a pontuação do jogador no objeto 'pessoa' armazenado no localStorage
    const lista_dados = JSON.parse(localStorage.getItem('pessoa')) || [];
    for (let i = 0; i < lista_dados.length; i++) {
        if (localStorage.getItem('cpf') == lista_dados[i].cpf) {
            lista_dados[i].score = valore_atual;
        }
    }
    const dadosJSON = JSON.stringify(lista_dados); // Converte o array atualizado em JSON
    localStorage.setItem('pessoa', dadosJSON); // Salva os dados atualizados no localStorage

    // Atualiza a pontuação exibida na tela
    document.getElementById('score').textContent = score;
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return; // Impede que o jogador vire cartas enquanto o tabuleiro está bloqueado
    if (this === firstCard) return; // Impede que o jogador vire a mesma carta duas vezes

    this.classList.add('flip'); // Adiciona a classe 'flip' à carta para mostrar seu lado da frente

    if (!hasFlippedCard) {
        hasFlippedCard = true; // Indica que a primeira carta foi virada
        firstCard = this; // Armazena a primeira carta virada
        return;
    }

    secondCard = this; // Armazena a segunda carta virada
    checkForMatch(); // Verifica se as duas cartas viradas são iguais
}

// Função para verificar se as cartas viradas são um par
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; // Verifica se os datasets das cartas coincidem

    isMatch ? disableCards() : unflipCards(); // Se for um par, desabilita as cartas; caso contrário, desvira as cartas
}

// Função para desabilitar as cartas (par encontrado)
function disableCards() {
    firstCard.removeEventListener('click', flipCard); // Remove o evento de clique da primeira carta
    secondCard.removeEventListener('click', flipCard); // Remove o evento de clique da segunda carta

    resetBoard(); // Reseta o estado do tabuleiro
    increaseScore(); // Aumenta a pontuação
    checkForWin(); // Verifica se o jogador encontrou todos os pares
}

// Função para desvirar as cartas (não são um par)
function unflipCards() {
    lockBoard = true; // Bloqueia o tabuleiro

    setTimeout(() => {
        firstCard.classList.remove('flip'); // Remove a classe 'flip' da primeira carta
        secondCard.classList.remove('flip'); // Remove a classe 'flip' da segunda carta

        resetBoard(); // Reseta o estado do tabuleiro
    }, 1500); // Tempo de espera antes de desvirar as cartas
}

// Função para resetar o estado do tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]; // Reseta as variáveis de controle
    [firstCard, secondCard] = [null, null]; // Reseta as cartas viradas
}

// Função para verificar se todas as cartas foram viradas
function checkForWin() {
    const allFlipped = [...cards].every(card => card.classList.contains('flip')); // Verifica se todas as cartas têm a classe 'flip'
    if (allFlipped) {
        setTimeout(() => {
            alert('Parabéns! Você encontrou todos os pares! Sua pontuação ' + score); // Exibe uma mensagem de vitória
            location.reload(); // Recarrega a página
        }, 500); // Tempo de espera antes de exibir a mensagem
    }
}

// Função imediata para embaralhar as cartas
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length); // Gera uma posição aleatória para cada carta
        card.style.order = randomPos; // Define a ordem da carta com a posição aleatória
    });
})();

// Adiciona o evento de clique a cada carta
cards.forEach(card => card.addEventListener('click', flipCard));
