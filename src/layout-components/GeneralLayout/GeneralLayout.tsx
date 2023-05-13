import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import MUILink from '../../ui-kit/MUILink/MUILink';

interface GeneralLayoutProps {
  children: ReactNode;
}

export const GeneralLayout = (props: GeneralLayoutProps) => {
  const { children } = props;

  return (
    <Box>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={ { mr: 2 } }
          >
            <MenuIcon/>
          </IconButton>
          <MUILink href="/">
            Zakaz Frontend Guild
          </MUILink>
          <MUILink href="/reviewers">
            List of reviewers
          </MUILink>
          <Button color="inherit" sx={{ml: 'auto'}}>Login</Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ px: 3 }}>
        <Toolbar />
        { children }
      </Box>
    </Box>
  );
};
