import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

const tiers = [
    // {
    //     title: 'UI',
    //     description: [
    //         'React application',
    //         'Modern design with MUI',
    //         'Accessible design',
    //         'Responsive UI'
    //     ],
    //     link: 'https://github.com/PlayLiveChess/playlivechess-ui',
    //     buttonText: 'See Source',
    //     buttonVariant: 'outlined',
    // },
    {
        title: 'Game',
        description: [
            'Low latency with websockets',
            'Fault tolerant',
            'Highly scalable',
            'Provide health checks',
        ],
        link: 'https://github.com/PlayLiveChess/playlivechess-game',
        buttonText: 'See Source',
        buttonVariant: 'outlined',
    },
    {
        title: 'Manager',
        description: [
            'Manages game instances',
            'Fault tolerant',
            'Highly scalable',
            'Uses AWS SDK',
        ],
        link: 'https://github.com/PlayLiveChess/playlivechess-manager',
        buttonText: 'See Source',
        buttonVariant: 'outlined',
    },
    {
        title: 'Auth',
        description: [
            'Maintains structured data',
            'Provide safe access',
            'Highly scalable',
            'SQL under the hood',
        ],
        link: 'https://github.com/PlayLiveChess/playlivechess-auth',
        buttonText: 'See Source',
        buttonVariant: 'outlined',
    },
];

function PricingContent() {
    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Play Live Chess
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Play chess with your friends at the game of chess online! We ensure ultra low latency,
                    and super fast pairing with our highly scalable systems. Learn about our different services which give you this amazing experience below.
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main" sx={{marginBottom: 4}}>
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === 'Enterprise' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant} href={tier.link} target="_blank">
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>            
        </React.Fragment>
    );
}

export default function Home() {
    return <PricingContent />;
}