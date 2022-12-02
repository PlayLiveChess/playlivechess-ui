import { useRef } from 'react';

import { Chessboard } from 'react-chessboard';
import { connect } from 'react-redux';
import { appendMove, setGame, setPending, STAGE } from '../../redux/playSlice';
import Result from './Result';

function Board({ boardWidth, playerColor, game, sendJSON, stage, result, dispatch }) {
    const chessboardRef = useRef();

    function onDrop(sourceSquare, targetSquare) {
        const gameCopy = { ...game };
        const piece = game.get(sourceSquare)
        
        if(piece.color !== playerColor.charAt(0)) {
            console.log('Not allowed!', piece.color, playerColor)
            return null
        }

        const moveObj = {
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // always promote to a queen for example simplicity
        }

        const move = gameCopy.move(moveObj);

        if(move) {
            dispatch(setPending('move'))
            sendJSON({
                type: 'move',
                value: move.san
            })
            dispatch(appendMove(move.san))
        }

        dispatch(setGame(gameCopy));
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
                boardOrientation={playerColor}
                customBoardStyle={{
                    borderRadius: '4px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                }}
                ref={chessboardRef}
            />

            <Result open={stage === STAGE.RESULT} result={result} parentId={"board-parent"}
                playerColor={playerColor} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    playerColor: state.play.playerColor,
    game: state.play.game,
    stage: state.play.stage,
    result: state.play.result,
})

export default connect(mapStateToProps)(Board);