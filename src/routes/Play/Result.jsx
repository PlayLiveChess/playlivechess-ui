import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { COLOR, setActiveStep, setStage, STAGE } from '../../redux/playSlice';
import { Link } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { yellow } from '@mui/material/colors';

const TITLE_MAP = {
    'win': 'You Won!',
    'draw': 'Draw',
    'lose': 'You Lost!',
}

export default function Result({ open, result, playerColor, parentId }) {
    const dispatch = useDispatch()
    let status = 'draw'
    if(result.result === "1-0" || result.result === "0-1")
        if (result.result === "1-0" ^ playerColor === COLOR.WHITE)
            status = 'lose'
        else
            status = 'win'

    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            container={() => document.getElementById(parentId)}
            style={{position: 'absolute'}}
            BackdropProps={{ style: { position: 'absolute' } }}
        >
            <DialogTitle id="alert-dialog-title">
                {status ? TITLE_MAP[status] : ''}
            </DialogTitle>
            <DialogContent>
                {
                    (status === 'win') ?
                        <EmojiEventsIcon fontSize='large' sx={{color: yellow[700], width: '100%'}} />
                    : (status === 'lose') ?
                        <SentimentVeryDissatisfiedIcon fontSize='large' sx={{ width: '100%'}} />
                    :
                        <SentimentDissatisfiedIcon fontSize='large' sx={{ width: '100%'}} />
                }
                <DialogContentText id="alert-dialog-description">
                    Reason: {result && result.reason ? result.reason : ''}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    dispatch(setActiveStep(-1))
                    dispatch(setStage(STAGE.PRE_GAME))
                }}>Exit</Button>
                <Link to="/">
                    <Button>Home</Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
}