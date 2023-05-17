import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import TableViewIcon from '@mui/icons-material/TableView';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import * as React from 'react';

/**
 * Список иконок material ui https://mui.com/material-ui/material-icons/?query=table
 * */

export const mainListItems = (
  <React.Fragment>
    <Link href={ '/' }>
      <ListItemButton href={ '/' }>
        <ListItemIcon>
          <HomeIcon/>
        </ListItemIcon>
        <ListItemText primary="Home"/>
      </ListItemButton>
    </Link>

    <Link href={ '/reviewers' }>
      <ListItemButton href={ '/reviewers' }>
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
    <ListItemButton>
      <ListItemIcon>
        <GroupIcon/>
      </ListItemIcon>
      <ListItemText primary="Users"/>
    </ListItemButton>
  </React.Fragment>
);
