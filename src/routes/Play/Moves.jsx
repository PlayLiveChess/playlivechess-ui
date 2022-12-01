import { CardHeader, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Moves(props) {
    return (
    <Card variant="outlined" style={{height: props.height}}>
        <CardHeader
            title="Moves"
            style={{maxHeight: '20%'}}
        />
        <CardContent style={{ maxHeight: '80%', overflowY: 'auto'}}>
            <Grid container>
            {
                props.moves.map((move, index) => {
                    return (
                        <>
                        {
                            (index % 2 === 0) ?
                                <Grid item xs={2}>
                                    <Typography sx={{fontSize: 14}} color="text.primary"
                                        gutterBottom>
                                            {index / 2 + 1}
                                    </Typography>
                                </Grid>
                            :
                                <></>
                        }
                        <Grid item xs={5} key={index}>
                        <Typography sx={{fontSize: 14}} color="text.secondary"
                            gutterBottom>
                                {move}
                        </Typography>
                        </Grid>
                        </>
                    )
                })
            }
            </Grid>
        </CardContent>
    </Card>
    )
}