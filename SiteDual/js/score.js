// Função para inicializar a pontuação
export function initializeScore() {
    // Obtém a pontuação salva no localStorage, converte para número inteiro ou define como 0 se não houver valor
    let score = parseInt(localStorage.getItem('score')) || 0;
    // Atualiza o display da pontuação na interface
    updateScoreDisplay(score);
}

// Função para atualizar a pontuação
export function updateScore(points) {
    // Obtém a pontuação salva no localStorage, converte para número inteiro ou define como 0 se não houver valor
    let score = parseInt(localStorage.getItem('score')) || 0;
    // Adiciona os pontos recebidos como argumento à pontuação atual
    score += points;
    // Salva a nova pontuação no localStorage
    localStorage.setItem('score', score);
    // Atualiza o display da pontuação na interface
    updateScoreDisplay(score);

    // Obtém o CPF salvo no localStorage
    const cpf = localStorage.getItem('cpf');
    // Obtém a lista de dados das pessoas do localStorage, converte de JSON para array ou define como array vazio se não houver valor
    const lista_dados = JSON.parse(localStorage.getItem('pessoa')) || [];

    // Percorre a lista de dados das pessoas
    for (let i = 0; i < lista_dados.length; i++) {
        // Verifica se encontrou a pessoa com o CPF correspondente
        if (cpf === lista_dados[i].cpf) {
            // Atualiza a pontuação da pessoa encontrada na lista
            lista_dados[i].score = score;
            break; // Interrompe o loop após encontrar e atualizar o score
        }
    }

    // Converte a lista atualizada de dados das pessoas de volta para JSON
    const dadosJSON = JSON.stringify(lista_dados);
    // Salva a lista atualizada de dados das pessoas no localStorage
    localStorage.setItem('pessoa', dadosJSON);
}

// Função para atualizar o display da pontuação na interface
function updateScoreDisplay(score) {
    // Seleciona o elemento HTML com o id 'score' e atualiza seu conteúdo com a nova pontuação
    document.getElementById('score').textContent = `Sua pontuação é ${score}!`;
}
