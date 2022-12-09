import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { setUsername } from '../redux/userSlice';
import { connect } from 'react-redux';

const pages = [
  {
    'text': 'Play',
    'link': '/play',
    // show: always, auth, noauth
    'show': 'always'
  },
  // {
  //   'text': 'About',
  //   'link': '/about',
  //   'show': 'always'
  // },
  {
    'text': 'Login',
    'link': '/login',
    'show': 'noauth'
  },
  {
    'text': 'Sign Up',
    'link': '/signup',
    'show': 'noauth'
  },
  {
    'text': 'Evaluate',
    'link': '/evaluate',
    'show': 'always'
  },
];
const settings = [{
  'text': 'Logout',
  'onClick': (dispatch) => dispatch(setUsername(''))
}];

function ResponsiveAppBar({ username, dispatch }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} variant="rounded" src="/plc.png" alt="PLC">
          </Avatar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PlayLiveChess
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => {
                if((username && page.show === 'noauth') ||
                  (!username && page.show === 'auth'))
                  return <span key={index}></span>
                return (
                  <Link to={page.link} key={index} >
                  <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.text}</Typography>
                  </MenuItem>
                  </Link>
                )
              })}
            </Menu>
          </Box>
          <Avatar sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} variant="rounded" src="/plc.png" alt="PLC">
          </Avatar>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PLC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => {
              if((username && page.show === 'noauth') ||
              (!username && page.show === 'auth'))
                return <span key={index}></span>
              return (
                <Link to={page.link} key={index}>
                  <Button
                    key={page.text}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.text}
                  </Button>
                </Link>
              )
            })}
          </Box>

          <Box sx={{ flexGrow: 0, display: username ? '' : 'none' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Typography textAlign="center">{username}</Typography>
              </MenuItem>
              {settings.map((setting) => (
                <MenuItem key={setting.text} onClick={() => {
                  handleCloseUserMenu()
                  setting.onClick(dispatch)
                }}>
                  <Typography textAlign="center">{setting.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  username: state.user.username
})

export default connect(mapStateToProps) (ResponsiveAppBar);