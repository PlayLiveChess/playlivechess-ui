import { CardHeader, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Coms(props) {
    return (
    <Card variant="outlined" style={{height: props.height}}>
        <CardHeader
            title="Communication"
            style={{maxHeight: '30%'}}
        />
        <CardContent style={{ maxHeight: '70%', overflowY: 'auto'}}>
            <Grid container>
            {
                props.coms.map((com, index) => {
                    return (
                        <>
                        <Grid container key={index}>
                        <Grid item xs={2} >
                            {
                                (com.direction === 'up') ?
                                    <ArrowUpwardIcon />
                                :
                                    <ArrowDownwardIcon />
                            }
                        </Grid>
                        <Grid item xs={4} >
                            <Typography sx={{fontSize: 14}} color="text.secondary"
                                gutterBottom>
                                    {com.type}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} >
                            <Typography sx={{fontSize: 14}} color="text.secondary"
                                gutterBottom>
                                    {com.value}
                            </Typography>
                        </Grid>
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