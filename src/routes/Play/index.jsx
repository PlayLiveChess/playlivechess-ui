import { Container, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from "react";
import Board from "./Board";
import GameDetails from "./GameDetails";

export default function Play() {
    const [chessboardSize, setChessboardSize] = useState(undefined);

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
                    <GameDetails height={chessboardSize} />
                </Grid>
            </Grid>
        </Box>
        </Container>
    );
}