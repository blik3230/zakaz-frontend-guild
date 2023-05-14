import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import useAuthService from '../../modules/auth/hooks/useAuthService';
import MUILink from '../../ui-kit/MUILink/MUILink';

interface GeneralLayoutProps {
  children: ReactNode;
}

const mainSx = {
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
  px: 3,
};

const whapChildrenSx = {
  flex: '1 0 auto',
  width: '100%',
  minHeight: 0,
};

export const GeneralLayout = (props: GeneralLayoutProps) => {
  const { children } = props;
  const { isLogedIn, logout } = useAuthService();

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

          <MUILink href="/" color={ 'inherit' }>
            Zakaz Frontend Guild
          </MUILink>

          <Typography variant="h6" component="div"
                      sx={ { mx: 1 } }>|</Typography>

          <MUILink href="/reviewers" color={ 'inherit' }>
            List of reviewers
          </MUILink>

          {
            isLogedIn && (
              <Button
                color="inherit"
                sx={ { ml: 'auto' } }
                onClick={ () => logout() }
              >
                Logout
              </Button>
            )
          }

        </Toolbar>
      </AppBar>
      <Box component="main" sx={ mainSx } id="main">
        <Toolbar/>
        <Box sx={ whapChildrenSx }>
          { children }
        </Box>
      </Box>
    </Box>
  );
};
