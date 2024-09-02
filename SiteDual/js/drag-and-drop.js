import { updateScore } from './score.js'; // Importa a função updateScore do módulo score.js

export function initializeDragAndDrop() {
    const pieces = document.querySelectorAll('.puzzle-piece'); // Seleciona todas as peças do quebra-cabeça
    let draggedPiece = null; // Variável para armazenar a peça sendo arrastada

    // Configura os eventos de drag and drop para cada peça do quebra-cabeça
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart); // Evento ao iniciar o arraste da peça
        piece.addEventListener('dragend', dragEnd); // Evento ao finalizar o arraste da peça
        piece.draggable = true; // Permite que a peça seja arrastada
    });

    // Configura eventos adicionais relacionados ao drag and drop para cada peça
    pieces.forEach(piece => {
        piece.addEventListener('dragover', dragOver); // Evento enquanto uma peça está sendo arrastada sobre outra
        piece.addEventListener('dragenter', dragEnter); // Evento quando uma peça é arrastada para dentro de outra
        piece.addEventListener('dragleave', dragLeave); // Evento quando uma peça é arrastada para fora de outra
        piece.addEventListener('drop', dragDrop); // Evento ao soltar uma peça sobre outra
    });

    // Função para iniciar o arraste de uma peça
    function dragStart() {
        draggedPiece = this; // Define a peça sendo arrastada como a peça atual
        setTimeout(() => (this.style.opacity = '0.6'), 0); // Define a opacidade da peça enquanto é arrastada
    }

    // Função ao finalizar o arraste de uma peça
    function dragEnd() {
        draggedPiece = null; // Reinicia a variável de peça sendo arrastada
        this.style.opacity = '1'; // Restaura a opacidade original da peça
    }

    // Função chamada quando uma peça arrastada está sobreposta a outra peça
    function dragOver(e) {
        e.preventDefault(); // Impede o comportamento padrão do navegador para permitir a sobreposição
    }

    // Função chamada quando uma peça arrastada entra em outra peça
    function dragEnter(e) {
        e.preventDefault(); // Impede o comportamento padrão do navegador para permitir a entrada
        this.style.transform = 'scale(1.05)'; // Aplica um efeito visual à peça sobre a qual a outra está sendo arrastada
    }

    // Função chamada quando uma peça arrastada deixa de estar sobreposta a outra peça
    function dragLeave() {
        this.style.transform = 'scale(1)'; // Restaura o tamanho original da peça quando a outra peça deixa de estar sobreposta
    }

    // Função chamada quando uma peça arrastada é solta sobre outra peça
    function dragDrop() {
        if (draggedPiece !== this) { // Verifica se a peça arrastada não é a mesma que a peça atual
            let tempPosition = draggedPiece.dataset.position; // Troca as posições das peças no dataset
            draggedPiece.dataset.position = this.dataset.position;
            this.dataset.position = tempPosition;

            let tempHTML = draggedPiece.innerHTML; // Troca o conteúdo HTML das peças
            draggedPiece.innerHTML = this.innerHTML;
            this.innerHTML = tempHTML;

            checkIfSolved(); // Verifica se o quebra-cabeça foi resolvido após a troca de peças
        }

        this.style.transform = 'scale(1)'; // Restaura o tamanho original da peça solta
    }

    // Função para verificar se o quebra-cabeça foi resolvido
    async function checkIfSolved() {
    const piecesArray = Array.from(pieces); // Converte a NodeList para um array de peças
    const sortedPieces = piecesArray.slice().sort((a, b) => a.dataset.position - b.dataset.position); // Ordena as peças pelo dataset 'position'

    // Verifica se todas as peças estão na posição correta
    if (piecesArray.every((piece, index) => piece === sortedPieces[index])) {
        await new Promise(resolve => setTimeout(resolve, 200)); // Aguarda 200 milissegundos de forma assíncrona
        alert('Parabéns! Você resolveu o quebra-cabeças!'); // Exibe um alerta de parabéns ao resolver o quebra-cabeça
        updateScore(100); // Chama a função para atualizar a pontuação após resolver o quebra-cabeça
    }
}

}
