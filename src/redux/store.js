import { configureStore } from '@reduxjs/toolkit'
import playReducer from './playSlice'
import userReducer from './userSlice'

export default configureStore({
    reducer: {
        play: playReducer,
        user: userReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})