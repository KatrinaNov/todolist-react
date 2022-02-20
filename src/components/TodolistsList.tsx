import React, {useCallback, useEffect} from 'react';
import {Container, Grid, Paper} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {
  addTodolistTC, changeFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterType, removeTodolistTC,
  TodolistDomainType
} from "../reducers/todolistReducer";
import {TaskStatuses} from "../api/todolists-api";
import {useAppSelector} from "../store/store";
import {addTaskTC, removeTaskTC, TasksType, updateTaskTC} from "../reducers/tasksReducer";
import AddItemForm from "./AddItemForm";
import Todolist from "./Todolist";


export const TodolistsList = () => {
  let todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  let tasks = useAppSelector<TasksType>(state => state.tasks)
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [dispatch])

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [dispatch])

  const upDateTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(changeTodolistTitleTC(todolistId, title))
  }, [dispatch])

  const removeTodolist = useCallback((todolistId: string) => {
    dispatch(removeTodolistTC(todolistId))
  }, [dispatch])

  const changeFilter = useCallback((todolistId: string, value: FilterType) => {
    dispatch(changeFilterAC(value, todolistId))
  }, [dispatch])

  const addTask = useCallback((todolistId: string, taskTitle: string) => {
    dispatch(addTaskTC(todolistId, taskTitle))
  }, [dispatch])

  const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
    dispatch(updateTaskTC(todolistId, taskId, {status} ))
  }, [dispatch])

  const updateTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(updateTaskTC(todolistId, taskId, {title}))
  }, [dispatch])

  const removeTask = useCallback(function (id: string, todolistId: string) {
    dispatch(removeTaskTC(id, todolistId));
  }, [dispatch]);



  return (
      <Container fixed>
        <Grid container style={{padding: "20px"}}><AddItemForm addItemCallback={addTodolist}/></Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];

              return <Grid item key={tl.id}>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={allTodolistTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    entityStatus = {tl.entityStatus}
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
  );
}

export default TodolistsList;
