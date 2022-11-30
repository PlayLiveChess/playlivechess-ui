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
                console.log(display.offsetWidth - 20)
                setChessboardSize(display.offsetWidth - 20);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Container>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}
                direction="row"
                alignItems="center"
                style={{ minHeight: '85vh' }}
            >
                <Grid item className="board-container" xs={12} md={6}>
                    <Board boardWidth={chessboardSize} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <GameDetails />
                </Grid>
            </Grid>
        </Box>
        </Container>
    );
}