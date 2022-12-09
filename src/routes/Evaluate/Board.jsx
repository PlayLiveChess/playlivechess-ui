import { useRef } from 'react';

import { Chessboard } from 'react-chessboard';

function Board({ boardWidth, game, setGame, appendMove }) {
    const chessboardRef = useRef();

    function onDrop(sourceSquare, targetSquare) {
        const gameCopy = { ...game };

        const moveObj = {
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // always promote to a queen for example simplicity
        }

        const move = gameCopy.move(moveObj);

        if(move) {
            setGame(gameCopy)
            appendMove(move.san)
        }

        return move;
    }

    return (
        <div id='board-parent' style={{position: 'relative'}}>
            <Chessboard
                id="PlayVsPlay"
                animationDuration={200}
                boardWidth={boardWidth}
                position={(game) ? game.fen() : undefined}
                onPieceDrop={onDrop}
                customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                }}
                ref={chessboardRef}
            />
        </div>
    );
}

export default Board;