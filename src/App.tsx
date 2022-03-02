import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Box, Button, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Container, IconButton, LinearProgress, Typography} from "@mui/material";
import {useAppSelector} from "./store/store";
import {initializeAppTC, RequestStatusType} from "./reducers/app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackBar";
import TodolistsList from "./components/TodolistsList";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import Page404 from "./components/Page404";
import {useDispatch} from "react-redux";

function App() {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

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
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistsList/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/404" element={<Page404/>}/>
          <Route path="*"  element={<Navigate to={"/404"}/>}/>
        </Routes>
      </Container>

      {/*<TodolistsList/>*/}
      <ErrorSnackbar/>
    </div>
  );
}

export default App;
