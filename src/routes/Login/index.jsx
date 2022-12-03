// Initialized with material ui boiler plate code
// Link: https://github.com/mui/material-ui/blob/v5.10.14/docs/data/material/getting-started/templates/sign-in/SignIn.js

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Navigate } from 'react-router-dom';
import { setLoginError, setLoginPending, setUsername } from '../../redux/userSlice';
import { setPlayerDetails } from '../../redux/playSlice';
import { connect } from 'react-redux';
import { Alert, Snackbar } from '@mui/material';

const theme = createTheme();

function Login({ username, loginPending, loginError, dispatch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
      'username': data.get('username'),
      'password': data.get('password'),
    }

    dispatch(setLoginPending(true))

    fetch('http://' + process.env.REACT_APP_STATIC_AUTH + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then(resp => {
      if (resp.ok)
        return resp.json()
      throw Error(resp.status + ': ' + resp.statusText)
    })
    .then(resp => {
      if (resp.success === 'true') {
        dispatch(setLoginPending(false))
        dispatch(setUsername(obj.username))
        dispatch(setPlayerDetails({
          'name': obj.username,
          'rating': 1000
        }))
        console.log('login successful!')
      }
      else
        throw Error('Invalid credentials!')
    })
    .catch(error => {
      dispatch(setLoginError(error.message))
      dispatch(setLoginPending(false))
      console.log(error.message)
    })
  };

  if(username)
    return <Navigate replace to="/" />

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setLoginError(false));
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={loginError} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {loginError}
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loginPending}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  username: state.user.username,
  loginPending: state.user.loginPending,
  loginError: state.user.loginError
})

export default connect(mapStateToProps) (Login);