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
import { setSignUpError, setSignUpPending, setUsername } from '../../redux/userSlice';
import { connect } from 'react-redux';
import { setPlayerDetails } from '../../redux/playSlice';
import { Alert, Snackbar } from '@mui/material';

const theme = createTheme();

function SignUp({ username, signupPending, signupError, dispatch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
    }
    console.log(obj);

    dispatch(setSignUpPending(true))

    fetch('http://' + process.env.REACT_APP_STATIC_AUTH + '/auth/create_user', {
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
        dispatch(setSignUpPending(false))
        dispatch(setUsername(obj.username))
        dispatch(setPlayerDetails({
          'name': obj.username,
          'rating': 1000
        }))
        console.log('signup successful!')
      }
      else
        throw Error('Integrity error!')
    })
    .catch(error => {
      dispatch(setSignUpError(error.message))
      dispatch(setSignUpPending(false))
      console.log(error.message)
    })
  };

  if (username)
    return <Navigate replace to="/" />

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSignUpError(false));
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={signupError ? true : false} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {signupError}
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
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              disabled={signupPending}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
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
  signupError: state.user.signupError,
  signupPending: state.user.signupPending,
})

export default connect(mapStateToProps) (SignUp);