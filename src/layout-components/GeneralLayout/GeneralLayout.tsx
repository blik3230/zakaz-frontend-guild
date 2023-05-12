import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { ReactNode } from 'react';

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
          <Link href="/">
            <Typography href="/" variant="h6" component="a">
              Zakaz Frontend Guild
            </Typography>
          </Link>
          <Link href="/reviewers">
            <Typography href="/" variant="h6" component="a" sx={{ml: 2}}>
              List of reviewers
            </Typography>
          </Link>
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
