import { configureStore } from '@reduxjs/toolkit'
import playReducer from './playSlice'

export default configureStore({
    reducer: {
        play: playReducer,
    },
})