export function initializeScore() {
    let score = parseInt(localStorage.getItem('score')) || 0;
    updateScoreDisplay(score);
}

export function updateScore(points) {
    let score = parseInt(localStorage.getItem('score')) || 0;
    score += points;
    localStorage.setItem('score', score);
    updateScoreDisplay(score);

    const cpf = localStorage.getItem('cpf');
    const lista_dados = JSON.parse(localStorage.getItem('pessoa')) || [];

    for (let i = 0; i < lista_dados.length; i++) {
        if (cpf === lista_dados[i].cpf) {
            lista_dados[i].score = score;
            break;
        }
    }

    const dadosJSON = JSON.stringify(lista_dados);
    localStorage.setItem('pessoa', dadosJSON);
}

function updateScoreDisplay(score) {
    document.getElementById('score').textContent = `Sua pontuação é ${score}!`;
}
