const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;

    // Função para aumentar a pontuação
function increaseScore() {
        score += 10;
        let valore_atual=parseInt(localStorage.getItem('score'))+score
        localStorage.setItem('score',valore_atual)
         
        const lista_dados = JSON.parse(localStorage.getItem('pessoa')) || [];
        for(let i=0;i<lista_dados.length;i++){
                if(localStorage.getItem('cpf')==lista_dados[i].cpf) {
                    console.log(lista_dados[i])
                    lista_dados[i].score=valore_atual

                }
             }
             const dadosJSON = JSON.stringify(lista_dados);
             localStorage.setItem('pessoa', dadosJSON);
             


        document.getElementById('score').textContent = score;
    }

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    increaseScore();
    checkForWin();  // Verifica se o jogo terminou
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function checkForWin() {
    const allFlipped = [...cards].every(card => card.classList.contains('flip'));
    if (allFlipped) {
        
        setTimeout(() => {
            
            alert('Parabéns! Você encontrou todos os pares! Sua pontuação '+score);
            location.reload()
        }, 500);
    }
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));