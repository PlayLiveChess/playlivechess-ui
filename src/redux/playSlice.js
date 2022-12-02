import { createSlice } from '@reduxjs/toolkit';

export const STAGE = {
    PRE_GAME: 'PRE_GAME',
    IN_GAME: 'IN_GAME',
    RESULT: 'RESULT'
}

export const COLOR = {
    WHITE: 'WHITE',
    BLACK: 'BLACK'
}

export const playSlice = createSlice({
    name: 'play',
    initialState: {
        stage: STAGE.PRE_GAME,
        preGamePhase: 0,
        activeStep: 0,
        gameServerAddress: undefined,
        game: undefined,
        moves: [],
        playerDetails: undefined,
        opponentDetails: undefined,
        playerColor: COLOR.WHITE,
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
        },
        incrementActiveStep: (state) => {
            state.activeStep += 1
        },
        setActiveStep: (state, action) => {
            state.activeStep = action.payload
        },
        setGameServerAddress: (state, action) => {
            state.gameServerAddress = action.payload
        },
        setGame: (state, action) => {
            state.game = action.payload
        },
        appendMove: (state, action) => {
            state.moves.push(action.payload)
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { setStage, nextPreGamePhase, incrementActiveStep, setActiveStep,
    setGameServerAddress, setGame, appendMove, clearMoves, setPlayerDetails,
    setOpponentDetails, setPlayerColor } = playSlice.actions

export default playSlice.reducer