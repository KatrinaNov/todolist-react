import React from 'react';
import './App.css';
import {AppBar, Box, Button, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {IconButton, LinearProgress, Typography} from "@mui/material";
import {useAppSelector} from "./store/store";
import {RequestStatusType} from "./reducers/app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackBar";
import TodolistsList from "./components/TodolistsList";

function App() {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

  return (
    <div className="App">
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <Menu/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        {status === 'loading' && <LinearProgress color="success" />}
      </Box>
      <TodolistsList/>
      <ErrorSnackbar/>
    </div>
  );
}

export default App;
