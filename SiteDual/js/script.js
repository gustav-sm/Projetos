// script.js

// Evento que dispara quando o conteúdo do DOM está completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    const pieces = document.querySelectorAll('.puzzle-piece'); // Seleciona todas as peças do quebra-cabeça
    let emptyPiece = document.querySelector('.puzzle-piece.empty'); // Seleciona a peça vazia do quebra-cabeça
    let draggedPiece = null; // Variável para armazenar a peça que está sendo arrastada

    // Adiciona eventos de arrastar às peças
    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart); // Evento quando o arrasto começa
        piece.addEventListener('dragend', dragEnd); // Evento quando o arrasto termina
        piece.draggable = true; // Torna as peças arrastáveis
    });

    // Função chamada quando o arrasto começa
    function dragStart() {
        draggedPiece = this; // Armazena a peça arrastada
        setTimeout(() => (this.style.opacity = '0.6'), 0); // Reduz a opacidade da peça arrastada
    }

    // Função chamada quando o arrasto termina
    function dragEnd() {
        draggedPiece = null; // Reseta a peça arrastada
        this.style.opacity = '1'; // Restaura a opacidade original da peça
    }

    // Adiciona eventos de arrastar para manipulação de sobreposição e soltura
    pieces.forEach(piece => {
        piece.addEventListener('dragover', dragOver); // Evento quando a peça arrastada está sobre outra peça
        piece.addEventListener('dragenter', dragEnter); // Evento quando a peça arrastada entra na área de outra peça
        piece.addEventListener('dragleave', dragLeave); // Evento quando a peça arrastada deixa a área de outra peça
        piece.addEventListener('drop', dragDrop); // Evento quando a peça arrastada é solta sobre outra peça
    });

    // Função para permitir a soltura da peça
    function dragOver(e) {
        e.preventDefault(); // Previne o comportamento padrão
    }

    // Função chamada quando a peça arrastada entra na área de outra peça
    function dragEnter(e) {
        e.preventDefault(); // Previne o comportamento padrão
        this.style.transform = 'scale(1.05)'; // Aumenta levemente o tamanho da peça alvo
    }

    // Função chamada quando a peça arrastada deixa a área de outra peça
    function dragLeave() {
        this.style.transform = 'scale(1)'; // Restaura o tamanho original da peça alvo
    }

    // Função chamada quando a peça arrastada é solta sobre outra peça
    function dragDrop() {
        if (draggedPiece !== this) { // Verifica se a peça arrastada não é a mesma que a peça alvo
            // Troca as posições dos atributos data-position das peças arrastada e alvo
            let tempPosition = draggedPiece.dataset.position;
            draggedPiece.dataset.position = this.dataset.position;
            this.dataset.position = tempPosition;

            // Troca o conteúdo HTML das peças arrastada e alvo
            let tempHTML = draggedPiece.innerHTML;
            draggedPiece.innerHTML = this.innerHTML;
            this.innerHTML = tempHTML;

            // Verifica se o quebra-cabeça está resolvido
            checkIfSolved();
        }

        this.style.transform = 'scale(1)'; // Restaura o tamanho original da peça alvo
    }

    // Função para verificar se o quebra-cabeça está resolvido
    function checkIfSolved() {
        const piecesArray = Array.from(pieces); // Converte NodeList em array
        // Cria uma cópia do array de peças e as ordena pela posição
        const sortedPieces = piecesArray.slice().sort((a, b) => a.dataset.position - b.dataset.position);
        
        // Verifica se cada peça está na posição correta
        if (piecesArray.every((piece, index) => piece === sortedPieces[index])) {
            setTimeout(() => {
                alert('Parabéns! Você resolveu o quebra-cabeças!'); // Alerta de sucesso
            }, 200);
        }
    }
});
