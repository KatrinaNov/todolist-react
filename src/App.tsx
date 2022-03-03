import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppRootStateType, useAppSelector} from "./store/store";
import {initializeAppTC, RequestStatusType} from "./reducers/app-reducer";
import TodolistsList from "./components/TodolistsList";
import Page404 from "./components/Page404";
import {useDispatch, useSelector} from "react-redux";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {Navigate,  Route, Routes} from "react-router-dom";
import {Box, CircularProgress} from "@mui/material";
import {Login} from "./components/Login";
import {ErrorSnackbar} from "./components/ErrorSnackBar";
import {logoutTC} from "./reducers/auth-reducers";

function App() {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  const logoutHandler = useCallback(() => dispatch(logoutTC()), [dispatch])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }


  return (
    <div className="App">
      <ErrorSnackbar/>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              News
            </Typography>
            { isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
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

    </div>
  );
}

export default App;
