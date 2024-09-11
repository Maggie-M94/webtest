document.addEventListener('DOMContentLoaded', () => {
    const puzzle = document.getElementById('puzzle');
    const pieces = Array.from(document.querySelectorAll('.puzzle-piece'));
    let emptyPiece = document.getElementById('empty');

    pieces.forEach(piece => {
        piece.addEventListener('click', function() {
            const emptyPos = emptyPiece.getAttribute('data-position');
            const piecePos = this.getAttribute('data-position');
            
            if (canMove(piecePos, emptyPos)) {
                swap(piece, emptyPiece);
            }
        });
    });

    function canMove(piecePos, emptyPos) {
        // Check if the clicked piece is adjacent to the empty piece
        const diff = Math.abs(piecePos - emptyPos);
        return diff === 1 || diff === 3;  // Same row or adjacent column
    }

    function swap(piece, empty) {
        // Swap the positions of the piece and the empty space
        const tempPos = empty.getAttribute('data-position');
        empty.setAttribute('data-position', piece.getAttribute('data-position'));
        piece.setAttribute('data-position', tempPos);

        // Swap the visual positions
        const tempHtml = empty.innerHTML;
        empty.innerHTML = piece.innerHTML;
        piece.innerHTML = tempHtml;

        // Move the classes
        piece.classList.add('empty');
        empty.classList.remove('empty');

        // Update references
        emptyPiece = piece;
    }
});
