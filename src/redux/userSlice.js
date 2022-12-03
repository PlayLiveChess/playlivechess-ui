import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loginPending: false,
        loginError: '',
        signupPending: false,
        signupError: '',
        username: localStorage.getItem('username'),
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        setLoginPending: (state, action) => {
            if(action.payload)
                state.loginError = ''
            state.loginPending = action.payload
        },
        setSignUpPending: (state, action) => {
            if(action.payload)
                state.signupError = ''
            state.signupPending = action.payload
        },
        setUsername: (state, action) => {
            localStorage.setItem('username', action.payload)
            state.username = action.payload
        },
        setLoginError: (state, action) => {
            state.loginError = action.payload
        },
        setSignUpError: (state, action) => {
            state.signupError = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoginPending, setSignUpPending, setUsername, setLoginError,
    setSignUpError } = userSlice.actions

export default userSlice.reducer