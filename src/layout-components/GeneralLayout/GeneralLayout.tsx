import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, Container, Divider, IconButton, List, Toolbar, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { ReactNode, useState } from 'react';
import useAuthService from '../../modules/auth/hooks/useAuthService';
import { mainListItems, secondaryListItems } from './listItems';

interface GeneralLayoutProps {
  children: ReactNode;
}

const mainSx = {
  display: 'flex',
  width: '100%',
  height: '100vh',
  flexDirection: 'column',
  px: 3,
};

const whapChildrenSx = {
  width: '100%',
  height: '100%',
};

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${ drawerWidth }px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(
  MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

/* template was taken from https://github.com/mui/material-ui/tree/v5.13.1/docs/data/material/getting-started/templates/dashboard */

export const GeneralLayout = (props: GeneralLayoutProps) => {
  const [open, setOpen] = useState(true);
  const { children } = props;
  const { isLogedIn, logout, userProfile } = useAuthService();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={ { display: 'flex' } }>
      <AppBar position="absolute">
        <Toolbar>
          {
            isLogedIn && (
              <Box sx={ { mr: 2 } }>
                {
                  open ? (
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="close drawer"
                      onClick={ toggleDrawer }
                    >
                      <ChevronLeftIcon/>
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      onClick={ toggleDrawer }
                    >
                      <MenuIcon/>
                    </IconButton>
                  )
                }
              </Box>
            )
          }

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={ { flexGrow: 1 } }
          >
            Zakaz Frontend Guild
          </Typography>

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

          {
            userProfile && (
              <Avatar>
                { `${ userProfile.firstName[0].toUpperCase() }${ userProfile.lastName[0].toUpperCase() }` }
              </Avatar>
            )
          }

        </Toolbar>
      </AppBar>

      {
        isLogedIn && (
          <Drawer variant="permanent" open={ open }>
            <Toolbar
              sx={ {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              } }
            >
            </Toolbar>

            <List component="nav" sx={ (theme) => ({
              [theme.breakpoints.up('sm')]: {
                pl: 1,
              },
            }) }>
              { mainListItems }
              <Divider sx={ { my: 1 } }/>
              { secondaryListItems }
            </List>
          </Drawer>
        )
      }

      <Box component="main" sx={ mainSx } id="main">
        <Toolbar/>
        <Container maxWidth="lg" sx={ { mt: 4, mb: 4, height: '100%' } }>
          <Box sx={ whapChildrenSx }>
            { children }
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
