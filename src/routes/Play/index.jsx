import { Container, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Chess from "chess.js";
import { useState, useEffect } from "react";
import Board from "./Board";
import GameDetails from "./GameDetails";
import PreGame from "./PreGame";

export const STATE = {
    PRE_GAME: 'PRE_GAME',
    IN_GAME: 'IN_GAME',
    RESULT: 'RESULT'
}

const MIN_DETAILS_HEIGHT = 650

export default function Play() {
    const [chessboardSize, setChessboardSize] = useState(MIN_DETAILS_HEIGHT);
    const [state, setState] = useState(STATE.PRE_GAME)
    const [preGamePhase, setPreGamePhase] = useState(0)
    const [gameServerAddress, setGameServerAddress] = useState(undefined)
    const [game, setGame] = useState(undefined)
    const [moves, setMoves] = useState([])
    const [playerDetails, setPlayerDetails] = useState(undefined)
    const [opponentDetails, setOppoentDetails] = useState(undefined)
    const [playerColor, setPlayerColor] = useState(undefined)
    

    useEffect(() => {
        function handleResize() {
            const display = document.getElementsByClassName("board-container")[0];
            if(display) {
                setChessboardSize(display.offsetWidth - 20);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const startGame = (_color, _opponentDetails) => {
        setPlayerColor(_color)
        setOppoentDetails(_opponentDetails)
        setGame(new Chess())
    }

    return (
        <Container>
        <Box sx={{ flexGrow: 1, my: 2 }}>
            <Grid container spacing={2}
                direction="row"
                alignItems="center"
                style={{ minHeight: '83vh' }}
            >
                <Grid item className="board-container" xs={12} md={7} lg={8}>
                    <Board boardWidth={chessboardSize} />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    {
                        (state === STATE.IN_GAME || state === STATE.RESULT) ?
                            <GameDetails height={Math.max(chessboardSize, MIN_DETAILS_HEIGHT)} />
                        :
                            <PreGame
                                height={Math.max(chessboardSize, MIN_DETAILS_HEIGHT)}
                                preGamePhase={preGamePhase}
                                setPreGamePhase={setPreGamePhase}
                                setGameServerAddress={setGameServerAddress}
                                startGame={startGame}
                                 />
                    }
                </Grid>
            </Grid>
        </Box>
        </Container>
    );
}