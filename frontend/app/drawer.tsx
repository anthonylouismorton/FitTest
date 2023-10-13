import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const handleRoute = (text: string) => (event: React.MouseEvent<HTMLLIElement>) => {
    console.log(`Clicked on: ${text}`);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
      <List>
        <a href="/Respirator">
        <ListItem>
          <ListItemText primary="Respirators" />
        </ListItem>
        </a>
        <a href="/Company">
        <ListItem>
          <ListItemText primary="Companies" />
        </ListItem>
        </a>
        <a href="/Quantitativefittest">
        <ListItem>
          <ListItemText primary="Quantitative Fit Test" />
        </ListItem>
        </a>
        <a href="/Qualitativefittest">
        <ListItem>
          <ListItemText primary="Qualitative Fit Test" />
        </ListItem>
        </a>
      </List>
      </Drawer>
    </Box>
  );
}
