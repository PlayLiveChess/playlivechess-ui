import { Box, Stack } from "@mui/material";
import { connect } from "react-redux";
import { COLOR } from "../../redux/playSlice";
import Coms from "./Coms";
import Moves from "./Moves";
import Player from "./Player";


function GameDetails({ height, playerDetails, opponentDetails, playerColor, game }) {
    return (
        <Box height={height} width={"100%"}>
            <Stack height={"100%"} width={"100%"} spacing={2}>
                <Box height={"10%"} width={"100%"}>
                    <Player color={playerColor === COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE}
                        name={opponentDetails.name} rating={opponentDetails.rating}
                        active={game.turn() !== playerColor.charAt(0)} />
                </Box>
                <Box height={"40%"} width={"100%"} >
                    <Moves height={"100%"}
                        moves={Array(50).fill('e4')} />
                </Box>
                
                <Box height={"34%"} width={"100%"}>
                    <Coms height={"100%"} coms={Array(50).fill({'direction': 'up', 'type': 'move', 'value': 'e4'})} />
                </Box>
                <Box height={"10%"} width={"100%"}>
                    <Player color={playerColor} name={playerDetails.name}
                        rating={playerDetails.rating} active={game.turn() === playerColor.charAt(0)} />
                </Box>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state) => ({
    playerDetails: state.play.playerDetails,
    opponentDetails: state.play.opponentDetails,
    playerColor: state.play.playerColor,
    game: state.play.game
})

export default connect(mapStateToProps) (GameDetails);