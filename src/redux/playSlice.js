import { createSlice } from '@reduxjs/toolkit';
import Chess from 'chess.js';

export const STAGE = {
    PRE_GAME: 'PRE_GAME',
    IN_GAME: 'IN_GAME',
    RESULT: 'RESULT'
}

export const COLOR = {
    WHITE: 'white',
    BLACK: 'black'
}

export const playSlice = createSlice({
    name: 'play',
    initialState: {
        stage: STAGE.PRE_GAME,
        preGamePhase: 0,
        activeStep: 0,
        gameServerAddress: undefined,
        // this gives warning, but we have to settle somewhere :)
        game: new Chess(),
        moves: [],
        coms: [],
        playerDetails: {
            'name': localStorage.getItem('username') ?
                localStorage.getItem('username') : 'Player',
            'rating': 1000
        },
        opponentDetails: {
            'name': 'Player',
            'rating': 1000
        },
        playerColor: COLOR.WHITE,
        pending: '',
        result: {},
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        setStage: (state, action) => {
            state.stage = action.payload
        },
        nextPreGamePhase: (state) => {
            state.preGamePhase += 1
            state.activeStep = -1
        },
        incrementActiveStep: (state) => {
            state.activeStep += 1
        },
        setActiveStep: (state, action) => {
            state.activeStep = action.payload
        },
        setPreGamePhase: (state, action) => {
            state.preGamePhase = action.payload
        },
        setGameServerAddress: (state, action) => {
            state.gameServerAddress = action.payload
        },
        appendMove: (state, action) => {
            state.moves.push(action.payload)
        },
        appendCom: (state, action) => {
            state.coms.push(action.payload)
        },
        clearCom: (state) => {
            state.coms = []
        },
        clearMoves: (state) => {
            state.moves = []
        },
        setPlayerDetails: (state, action) => {
            state.playerDetails = action.payload
        },
        setOpponentDetails: (state, action) => {
            state.opponentDetails = action.payload
        },
        setPlayerColor: (state, action) => {
            state.playerColor = action.payload
        },
        setPending: (state, action) => {
            state.pending = action.payload
        },
        handleReply: (state, action) => {
            let data = action.payload
            if(data.success === 'true') {
                if(state.pending === 'queue')
                    state.activeStep += 1
                state.pending = ''
            }
        },
        startGame: (state, action) => {
            state.opponentDetails = action.payload.opponentDetails
            state.playerColor = action.payload.color
            state.stage = STAGE.IN_GAME
            state.game = new Chess()
        },
        setGame: (state, action) => {
            state.game = action.payload
        },
        makeMove: (state, action) => {
            var gameCopy = {...state.game}
            let move = gameCopy.move(action.payload)
            state.game = gameCopy
            
            if(move)
                state.moves.push(action.payload)
        },
        outcome: (state, action) => {
            if(action.payload.result === 'win')
                action.payload.result = state.playerColor === COLOR.WHITE ? "1-0" : "0-1"
            state.result = action.payload
            state.stage = STAGE.RESULT
        }
    },
})

// Action creators are generated for each case reducer function
export const { setStage, nextPreGamePhase, incrementActiveStep, setActiveStep,
    setGameServerAddress, appendMove, clearMoves, setPlayerDetails, setGame, makeMove,
    setOpponentDetails, setPlayerColor, setPending, handleReply, startGame,
    appendCom, clearCom, setPreGamePhase, outcome } = playSlice.actions

export default playSlice.reducer