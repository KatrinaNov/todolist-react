import React, {useCallback} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {IconButton, Typography} from "@mui/material";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./reducers/todolistReducer";
import {
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./store/store";

export type FilterType = "all" | "active" | "completed"
export type TodolistsType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolists = useSelector<RootReducerType, Array<TodolistsType>>(state => state.todolists)
  let tasks = useSelector<RootReducerType, TasksType>(state => state.tasks)
  let dispatch = useDispatch();

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [])

  const upDateTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  }, [])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }, [])

  const changeFilter = useCallback((todolistId: string, value: FilterType) => {
    dispatch(changeFilterAC(value, todolistId))
  }, [])

  const addTask = useCallback((todolistId: string, taskTitle: string) => {
    dispatch(addTaskAC(taskTitle, todolistId))
  }, [])

  const changeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
    dispatch(changeStatusAC(taskId, isDone, todolistId))
  }, [])

  const updateTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todolistId))
  }, [])

  const removeTask = useCallback((todolistId: string, id: string) => {
    dispatch(removeTaskAC(id, todolistId))
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
      </Box>
      <Container fixed>
        <Grid container style={{padding: "20px"}}><AddItemForm addItemCallback={addTodolist}/></Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;

              if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
              }

              return <Grid item>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateTaskTitle={updateTaskTitle}
                    upDateTodolistTitle={upDateTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>

    </div>
  );
}

export default App;
