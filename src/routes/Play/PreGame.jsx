import { Button, Card, CardActions, CardContent, CardHeader, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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

export default function PreGame({height, setGameServerAddress, preGamePhase, setPreGamePhase, startGame}) {
    const [activeStep, setActiveStep] = useState(preGamePhase === 1 ? -1 : 0)
    const [buttonEnabled, setButtonEnabled] = useState(preGamePhase === 1)

    // be careful, if you call this function multile times within some async function,
    // behaviour might not be what you are expecting
    // if you try finding a better way to implement this, and fail, please add the number
    // of hours wasted below, as a caution for future engineers
    // no_of_hours = 1

    const incrementActiveStep = () => {
        setActiveStep(activeStep + 1)
    }

    async function find_gameserver(setGameServerAddress) {
        await new Promise(r => setTimeout(r, 2000));
        setGameServerAddress('localhost:8000')
        incrementActiveStep()
    }
    
    async function connect_gameserver(gameServerAddress) {
        await new Promise(r => setTimeout(r, 2000));
        incrementActiveStep()
    }

    async function next_phase(gameServerAddress) {
        await new Promise(r => setTimeout(r, 1000));
        setActiveStep(-1)
        setButtonEnabled(true)
        setPreGamePhase(1)
    }

    async function add_to_queue() {
        await new Promise(r => setTimeout(r, 1000));
        incrementActiveStep()
        // console.log('added successful!', activeStep)

        await new Promise(r => setTimeout(r, 1000));
        // be careful, js is weird!
        setActiveStep(2)
        // console.log('match found')

        await new Promise(r => setTimeout(r, 1000));
        // be careful, js is weird!
        setActiveStep(3)
        // console.log('proceeding to match')
    }

    async function proceed_to_match() {
        await new Promise(r => setTimeout(r, 200));
        incrementActiveStep()
        startGame()
        console.log('start game', activeStep)
    }

    useEffect(() => {
        if(preGamePhase === 0) {
            if(activeStep === 0)
                find_gameserver(setGameServerAddress)
            else if(activeStep === 1)
                connect_gameserver()
            else
                next_phase()
        }
        else {
            if(activeStep === 0)
                add_to_queue()
            else if(activeStep === 2)
                proceed_to_match()
        }
    }, [activeStep])

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
                <Button disabled={!buttonEnabled} variant="outlined" size="large" sx={{width: '100%'}}
                    onClick={(ev) => {
                        console.log('button clicked!')
                        setButtonEnabled(false)
                        setActiveStep(0)
                    }}
                >
                    Start Game
                </Button>
            </CardActions>
        </Card>
    )
}