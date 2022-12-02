import { Container, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { appendCom, handleReply, incrementActiveStep, makeMove, nextPreGamePhase, outcome, setActiveStep, setPending, setPreGamePhase, setStage, STAGE, startGame } from "../../redux/playSlice";
import Board from "./Board";
import GameDetails from "./GameDetails";
import PreGame from "./PreGame";
import { w3cwebsocket } from "websocket";

const MIN_DETAILS_HEIGHT = 650
const OUTCOME_MAP = {
    1: 'CHECKMATE',
    2: 'STALEMATE',
    3: 'INSUFFICIENT_MATERIAL',
    4: 'SEVENTYFIVE_MOVES',
    5: 'FIVEFOLD_REPETITION ',
    6: 'FIFTY_MOVES',
    7: 'THREEFOLD_REPETITION ',
}

function Play({stage, gameServerAddress, playerColor, result, dispatch}) {
    const [chessboardSize, setChessboardSize] = useState(MIN_DETAILS_HEIGHT);
    const [socket, setSocket] = useState(undefined)

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

    useEffect(() => {
        if(gameServerAddress) {
            let url = 'ws://' + gameServerAddress + '/ws/connect/'
            let client = new w3cwebsocket(url)

            client.onopen = async () => {
                console.log("WebSocket Client Connected");
                dispatch(incrementActiveStep())

                // wait for 2 sec, and go to next phase
                await new Promise(r => setTimeout(r, 2000));
                dispatch(nextPreGamePhase())
            };

            client.onmessage = ({data}) => {
                data = JSON.parse(data)
                console.log("message received", data)
                if(data.type === 'reply') {
                    dispatch(handleReply(data))
                }
                else if(data.type === 'start') {
                    dispatch(startGame(data))
                }
                else if(data.type === 'opponent') {
                    dispatch(makeMove(data.value))
                }
                else if(data.type === 'disconnect') {
                    let obj = {
                        'result': 'win',
                        'reason': 'DISCONNECT'
                    }
                    dispatch(outcome(obj))
                }

                if(data.outcome) {
                    console.log(data)
                    let obj = {
                        'result': data.outcome.result,
                        'reason': OUTCOME_MAP[parseInt(data.outcome.termination)]
                    }
                    dispatch(outcome(obj))
                }
                data.direction = 'down'
                dispatch(appendCom(data))
            }

            client.onclose = () => {
                dispatch(setActiveStep(0))
                dispatch(setPreGamePhase(0))
                dispatch(setStage(STAGE.PRE_GAME))
            }

            setSocket(client)
        }
        // eslint-disable-next-line
    }, [gameServerAddress])

    const sendJSON = (obj) => {
        if(socket && socket.OPEN) {
            dispatch(setPending(obj.type))
            socket.send(JSON.stringify(obj))
            obj.direction = 'up'
            dispatch(appendCom(obj))
        }
        else
            console.log('Socket is not ready!')
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
                    <Board boardWidth={chessboardSize} sendJSON={sendJSON} />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    {
                        (stage === STAGE.IN_GAME || stage === STAGE.RESULT) ?
                            <GameDetails height={Math.max(chessboardSize, MIN_DETAILS_HEIGHT)} />
                        :
                            <PreGame height={Math.max(chessboardSize, MIN_DETAILS_HEIGHT)} sendJSON={sendJSON} />
                    }
                </Grid>
            </Grid>
        </Box>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    stage: state.play.stage,
    gameServerAddress: state.play.gameServerAddress,
    game: state.play.game,
    playerColor: state.play.playerColor,
    result: state.play.result,
})

export default connect(mapStateToProps) (Play);