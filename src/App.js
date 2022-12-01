import { Outlet } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import StickyFooter from './components/StickyFooter';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <ResponsiveAppBar />
      <Outlet/>
      <StickyFooter />
    </Box>
  );
}

export default App;
