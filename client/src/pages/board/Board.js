import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';
import SideList from './SideList';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Board() {
  const [open, setOpen] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  })

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Board
            </Typography>
          </Toolbar>
        </AppBar>
        <SideList {...{ open, setOpen }} />
      </Box>
    </ThemeProvider>
  );
}
