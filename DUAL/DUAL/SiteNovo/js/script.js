// script.js

document.addEventListener('DOMContentLoaded', function () {
    const pieces = document.querySelectorAll('.puzzle-piece');
    let emptyPiece = document.querySelector('.puzzle-piece.empty');
    let draggedPiece = null;

    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragend', dragEnd);
        piece.draggable = true;
    });

    function dragStart() {
        draggedPiece = this;
        setTimeout(() => (this.style.opacity = '0.6'), 0);
    }

    function dragEnd() {
        draggedPiece = null;
        this.style.opacity = '1';
    }

    pieces.forEach(piece => {
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('dragenter', dragEnter);
        piece.addEventListener('dragleave', dragLeave);
        piece.addEventListener('drop', dragDrop);
    });

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.style.transform = 'scale(1.05)';
    }

    function dragLeave() {
        this.style.transform = 'scale(1)';
    }

    function dragDrop() {
        if (draggedPiece !== this) {
            let tempPosition = draggedPiece.dataset.position;
            draggedPiece.dataset.position = this.dataset.position;
            this.dataset.position = tempPosition;

            let tempHTML = draggedPiece.innerHTML;
            draggedPiece.innerHTML = this.innerHTML;
            this.innerHTML = tempHTML;

            checkIfSolved();
        }

        this.style.transform = 'scale(1)';
    }

    function checkIfSolved() {
        const piecesArray = Array.from(pieces);
        const sortedPieces = piecesArray.slice().sort((a, b) => a.dataset.position - b.dataset.position);
        
        if (piecesArray.every((piece, index) => piece === sortedPieces[index])) {
            setTimeout(() => {
                alert('Parabéns! Você resolveu o quebra-cabeças!');
            }, 200);
        }
    }
});
