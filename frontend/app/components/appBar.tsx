"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signOut, useSession } from "next-auth/react";

const drawerWidth = 240;

export default function DrawerAppBar() {
  const { data: session } = useSession();
  console.log(session)
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {session?.user &&
            <>
            <Typography>
              {session.user.email}
            </Typography>
              <Button onClick={() => signOut()} sx={{ color: '#fff' }}>
                Sign Out
              </Button>
              <Button sx={{ color: '#fff' }}>
                Profile
              </Button>
            </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
