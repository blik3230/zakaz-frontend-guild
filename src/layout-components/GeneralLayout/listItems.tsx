import HomeIcon from '@mui/icons-material/Home';
import TableViewIcon from '@mui/icons-material/TableView';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import Link from 'next/link';
import * as React from 'react';

/**
 * Список иконок material ui https://mui.com/material-ui/material-icons/?query=table
 * */

export const mainListItems = (
  <React.Fragment>
    <Link href={ '/' } passHref>
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary="Home"/>
      </ListItemButton>
    </Link>

    <Link href={ '/reviewers' } passHref>
      <ListItemButton>
        <ListItemIcon>
          <TableViewIcon/>
        </ListItemIcon>
        <ListItemText primary="Reviewers table"/>
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/*<ListItemButton>
      <ListItemIcon>
        <GroupIcon/>
      </ListItemIcon>
      <ListItemText primary="Users"/>
    </ListItemButton>*/}

    <Link href={ '/mastermind' } passHref>
      <ListItemButton>
        <ListItemIcon>
          <VideogameAssetIcon/>
        </ListItemIcon>
        <ListItemText primary="Mastermind Game"/>
      </ListItemButton>
    </Link>
  </React.Fragment>
);
