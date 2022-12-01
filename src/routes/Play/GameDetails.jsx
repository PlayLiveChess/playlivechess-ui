import { Box, Stack } from "@mui/material";
import Coms from "./Coms";
import Moves from "./Moves";
import Player from "./Player";


export default function GameDetails({ height }) {
    return (
        <Box height={Math.max(height, 650)} width={"100%"}>
            <Stack height={"100%"} width={"100%"} spacing={2}>
                <Box height={"10%"} width={"100%"}>
                    <Player color={'black'} name={'Harshit Gulati'} rating={'1100'} />
                </Box>
                <Box height={"40%"} width={"100%"} >
                    <Moves height={"100%"}
                        moves={Array(50).fill('e4')} />
                </Box>
                
                <Box height={"34%"} width={"100%"}>
                    <Coms height={"100%"} coms={Array(50).fill({'direction': 'up', 'type': 'move', 'value': 'e4'})} />
                </Box>
                <Box height={"10%"} width={"100%"}>
                    <Player color={'white'} name={'Harsh Kumar'} rating={'1500'} />
                </Box>
            </Stack>
        </Box>
    )
}