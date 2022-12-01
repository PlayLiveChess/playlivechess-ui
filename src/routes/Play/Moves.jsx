import { CardHeader, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Moves(props) {
    const pairsOfMoves = []
    for(let index = 0; props.moves.length && index < props.moves.length / 2; ++index) {
        let pair = [props.moves[index * 2], ]
        if(index * 2 + 1 < props.moves.length)
            pair.push(props.moves[index * 2 + 1])
        if(pair.length)
            pairsOfMoves.push(pair)
    }

    return (
    <Card variant="outlined" style={{height: props.height}}>
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
                        <Grid item sx={2}>
                            <Typography sx={{fontSize: 14}} color="text.primary"
                                gutterBottom>
                                    {index + 1}
                            </Typography>
                        </Grid>
                        <Grid item sx={5}>
                        <Typography sx={{fontSize: 14}} color="text.secondary"
                            gutterBottom>
                                {move[0]}
                        </Typography>
                        </Grid>
                        <Grid item sx={5}>
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