import { Alert, createTheme, Grid, LinearProgress, Snackbar, Stack, ThemeProvider } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useState } from "react";
import Chess from 'chess.js';
import Board from "./Board";
import Moves from "../Play/Moves";
import { useEffect } from "react";
import { grey } from "@mui/material/colors";

const MIN_DETAILS_HEIGHT = 650

const theme = createTheme({
    palette: {
        primary: {
            main: grey[300],
        }
    },
});

function Evaluate() {
    const [game, setGame] = useState(new Chess())
    const [moves, setMoves] = useState([])
    const [chessboardSize, setChessboardSize] = useState(MIN_DETAILS_HEIGHT);
    const [value, setValue] = useState(undefined)
    const [error, setError] = useState('')

    useEffect(() => {
        function handleResize() {
            const display = document.getElementsByClassName("board-container")[0];
            if (display) {
                setChessboardSize(display.offsetWidth - 20);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setValue(undefined)
        let obj = {
            'position': game.fen()
        }
        fetch('http://' + process.env.REACT_APP_STATIC_EVALUATE + '/eval-fen/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(resp => {
                if (resp.ok)
                    return resp.json()
                throw Error(resp.status + ': ' + resp.statusText)
            })
            .then(resp => {
                if (resp.score)
                    setValue(resp.score)
                else
                    throw Error(resp.error)
            })
            .catch(error => {
                setError(error.message)
            })
    }, [game])

    const appendMove = (move) => {
        setMoves([...moves, move])
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        setError('')
    };

    return (
        <Container>
            <Snackbar open={error ? true : false} autoHideDuration={6000} onClose={handleClose}>
                <Alert variant='filled' onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Box sx={{ flexGrow: 1, my: 2 }}>
                <Grid container spacing={2}
                    direction="row"
                    alignItems="center"
                    style={{ minHeight: '83vh' }}
                >
                    <Grid item className="board-container" xs={12} md={7} lg={8}>
                        <Board boardWidth={chessboardSize} game={game} setGame={setGame} appendMove={appendMove} />
                    </Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Box height={chessboardSize} width={"100%"}>
                            <Stack height={"100%"} width={"100%"} spacing={2}>
                                <Box height={"96%"} width={"100%"} >
                                    <Moves height={"100%"} moves={moves} />
                                </Box>

                                <Box height={"2%"} width={"100%"}>
                                    <ThemeProvider theme={theme}>
                                        <LinearProgress color="primary" sx={{ height: 0.02 * chessboardSize, backgroundColor: grey[800] }} variant={value !== undefined ? "determinate" : "query"} value={value * 100} />
                                    </ThemeProvider>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Evaluate;