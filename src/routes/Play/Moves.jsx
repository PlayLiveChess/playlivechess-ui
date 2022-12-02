import { CardHeader, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';

function Moves({height, moves}) {
    const pairsOfMoves = []
    for(let index = 0; moves.length && index < moves.length / 2; ++index) {
        let pair = [moves[index * 2], ]
        if(index * 2 + 1 < moves.length)
            pair.push(moves[index * 2 + 1])
        if(pair.length)
            pairsOfMoves.push(pair)
    }

    return (
    <Card variant="outlined" style={{height: height}}>
        <CardHeader
            title="Moves"
            style={{maxHeight: '20%'}}
        />
        <CardContent style={{ maxHeight: '80%', overflowY: 'auto'}}>
            <Grid container>
            {
                pairsOfMoves.map((move, index) => {
                    return (
                        <Grid container key={index}>
                        <Grid item xs={2}>
                            <Typography sx={{fontSize: 14}} color="text.primary"
                                gutterBottom>
                                    {index + 1}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography sx={{fontSize: 14}} color="text.secondary"
                            gutterBottom>
                                {move[0]}
                        </Typography>
                        </Grid>
                        <Grid item xs={5}>
                        <Typography sx={{fontSize: 14}} color="text.secondary"
                            gutterBottom>
                                {move[1]}
                        </Typography>
                        </Grid>
                        </Grid>
                    )
                })
            }
            </Grid>
        </CardContent>
    </Card>
    )
}

const mapStateToProps = (state) => ({
    moves: state.play.moves,
})

export default connect(mapStateToProps) (Moves);