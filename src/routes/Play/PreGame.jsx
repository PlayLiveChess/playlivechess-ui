import { Button, Card, CardActions, CardContent, CardHeader, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { incrementActiveStep, setActiveStep, setGameServerAddress } from '../../redux/playSlice';

const steps = [
    {
        label: 'Find Game Server',
        description: 'Looking for a free game server. This ensures best performance for you with minimal lag move relay!',
    },
    {
        label: 'Connecting to Game Server',
        description: 'Establishing a web socket connection with the game server. Once this finishes, you can start a new game!',
    },
];

const startGameSteps = [
    {
        label: 'Adding To Queue',
        description: 'Adding to a queue according to your rating.',
    },
    {
        label: 'Waiting in Queue',
        description: '',
    },
    {
        label: 'Match Found',
        description: '',
    }
]

const startConnectPhase =  async (dispatch) => {
    dispatch(setActiveStep(0))

    if(process.env.REACT_APP_USE_MANAGER === 'true') {
        fetch('http://'+process.env.REACT_APP_MANAGER+'/available-gameserver/', {
            'TYPE': 'GET'
        })
        .then(resp => {
            if(resp.ok)
                return resp.json()
            throw Error('Error while fetching gameserver details!')
        })
        .then(resp => {
            dispatch(setGameServerAddress(resp.available))
            dispatch(incrementActiveStep())
        })
        .catch(error => {
            console.log(error.message)
        })
    }
    else {
        await new Promise(r => setTimeout(r, 2000));
        console.log(process.env.REACT_APP_STATIC_GAMESERVER)
        dispatch(setGameServerAddress(process.env.REACT_APP_STATIC_GAMESERVER))
        dispatch(incrementActiveStep())
    }
}

function PreGame({height, preGamePhase, activeStep, playerDetails, sendJSON}) {
    const dispatch = useDispatch()

    useEffect(() => {
        if(preGamePhase === 0)
            startConnectPhase(dispatch)
    }, [dispatch, preGamePhase])

    return (
        <Card variant="outlined" sx={{
            height: height,
            position: 'relative'
        }}>
            <CardHeader
                title="New Game"
                style={{maxHeight: '20%'}}
            />
            <CardContent sx={{maxHeight: '70%', overflowY: 'auto'}}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {
                        (preGamePhase === 0 ? steps : startGameSteps).map((step, index) => (
                            <Step key={index}>
                                <StepLabel>
                                {step.label}
                                </StepLabel>
                                <StepContent>
                                <Typography>{step.description}</Typography>
                                </StepContent>
                            </Step>
                        ))
                    }
                </Stepper>
            </CardContent>
            <CardActions sx={{maxHeight: '10%', width: '100%', overflowY: 'auto', position: 'absolute', bottom: '0px'}}>
                <Button disabled={!(preGamePhase === 1 && activeStep === -1)} variant="outlined" size="large" sx={{width: '100%'}}
                    onClick={() => {
                        let obj = {
                            'type': 'queue'
                        }
                        if(playerDetails)
                            obj['playerDetails'] = playerDetails
                        sendJSON(obj)
                        dispatch(incrementActiveStep())
                    }}
                >
                    Start Game
                </Button>
            </CardActions>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    preGamePhase: state.play.preGamePhase,
    activeStep: state.play.activeStep,
    playerDetails: state.play.playerDetails,
})

export default connect(mapStateToProps)(PreGame);