"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useSession } from "next-auth/react";

const drawerWidth = 200;

export default function PermanentDrawerLeft() {
  const { data: session } = useSession();
  return (
    <Box sx={{ display: 'flex' }}>
      {session?.user &&
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
        {session?.user.role === "admin" && 
          <ListItem disablePadding>
            <ListItemButton href="/Respirator">
              <ListItemText primary="Respirators" />
            </ListItemButton>
          </ListItem>
        }
        <ListItem disablePadding>
          <ListItemButton href="/Company">
            <ListItemText primary="Companies" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/Quantitativefittest">
            <ListItemText primary="Quantitative Fit Test" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/Qualitativefittest">
            <ListItemText primary="Qualitative Fit Test" />
          </ListItemButton>
        </ListItem>
      </List>
      </Drawer>
    }
    </Box>
  );
}
