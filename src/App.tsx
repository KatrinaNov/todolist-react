import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {IconButton, Typography} from "@mui/material";
import {
  addTodolistAC,
  changeFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistReducer
} from "./reducers/TodolistReducer";
import {
  addEmptyArrayOfTaskAC,
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeAllTaskAC, removeTaskAC,
  TasksReducer
} from "./reducers/TasksReducer";
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
  let dispatch = useDispatch();
  let tasks = useSelector<RootReducerType, TasksType>(state => state.tasks)
  let todolists = useSelector<RootReducerType, Array<TodolistsType>>(state => state.todolists)
  // let todolistID1 = v1();
  // let todolistID2 = v1();
  //
  // let [todolists, dispatchTodolists] = useReducer(TodolistReducer,[
  //   {id: todolistID1, title: 'What to learn', filter: 'all'},
  //   {id: todolistID2, title: 'What to buy', filter: 'all'},
  // ])
  //
  // let [tasks, dispatchTasks] = useReducer(TasksReducer,{
  //   [todolistID1]: [
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  //   ],
  //   [todolistID2]: [
  //     {id: v1(), title: "Milk", isDone: true},
  //     {id: v1(), title: "Meat", isDone: true},
  //     {id: v1(), title: "Cake", isDone: false},
  //   ]
  // })

  function addTodolist(title: string) {
    let newId = v1();
    // dispatchTodolists(addTodolistAC(newId,title))
    // dispatchTasks(addEmptyArrayOfTaskAC(newId))
    dispatch(addTodolistAC(newId,title))
    dispatch(addEmptyArrayOfTaskAC(newId))
  }

  function upDateTodolistTitle(todolistId: string, title: string) {
    dispatch(changeTodolistTitleAC(todolistId,title))
  }

  function removeTodolist(todolistId: string) {
    dispatch(removeTodolistAC(todolistId))
    dispatch(removeAllTaskAC(todolistId))
  }

  function changeFilter(todolistId: string, value: FilterType) {
    dispatch(changeFilterAC(value, todolistId))
  }

  function addTask(todolistId: string, taskTitle: string) {
    dispatch(addTaskAC(taskTitle, todolistId))
  }

  function changeTaskStatus(todolistId: string, taskId: string, isDone: boolean) {
    dispatch(changeStatusAC(taskId, isDone, todolistId))
  }

  function updateTaskTitle(todolistId: string, taskId: string, title: string) {
    dispatch(changeTaskTitleAC(taskId, title, todolistId))
  }

  function removeTask(todolistId: string, id: string) {
    dispatch(removeTaskAC(id, todolistId))
  }


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
