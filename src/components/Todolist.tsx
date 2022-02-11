import React, {useCallback, useEffect} from 'react';
import {FilterType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import Task from "./Task";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {useDispatch} from "react-redux";
import {fetchTodolistsTC} from "../reducers/todolistReducer";
import {fetchTasksTC} from "../reducers/tasksReducer";

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (todolistId: string, id: string) => void
  changeFilter: (todolistId: string, value: FilterType) => void
  addTask: (todolistId: string, taskTitle: string) => void
  filter: FilterType
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  todolistId: string
  removeTodolist: (todolistId: string) => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
  upDateTodolistTitle: (todolistId: string, title: string) => void
}

const Todolist = React.memo((props: PropsType) => {

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(props.todolistId))
  }, [])

  const changeFilterHandler = useCallback((filter: FilterType) => props.changeFilter(props.todolistId, filter), [props.changeFilter, props.todolistId])

  const addTaskTitle = useCallback((title: string) => {
    props.addTask(props.todolistId, title)
  }, [props.addTask, props.todolistId])

  const upDateTodolistTitle = useCallback((title: string) => {
    props.upDateTodolistTitle(props.todolistId, title);
  }, [props.upDateTodolistTitle, props.todolistId])

  const removeTodolist = useCallback(() => props.removeTodolist(props.todolistId), [props.removeTodolist, props.todolistId])

  let tasksForTodolist = props.tasks

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} upDateItemTitle={upDateTodolistTitle}/>
        <IconButton aria-label="delete">
          <Delete fontSize="inherit" onClick={removeTodolist}/>
        </IconButton>
      </h3>

      <AddItemForm addItemCallback={addTaskTitle}/>
      <ul>
        {
          tasksForTodolist.map(task => {
            return <Task
              task={task}
              removeTask={props.removeTask}
              todolistId={props.todolistId}
              changeTaskStatus={props.changeTaskStatus}
              updateTaskTitle={props.updateTaskTitle}
            />
          })
        }
      </ul>

      <div>
        <Button variant={props.filter === 'all' ? "contained" : 'outlined'} color="secondary"
                onClick={() => changeFilterHandler('all')}>All</Button>
        <Button variant={props.filter === 'active' ? "contained" : 'outlined'} color="primary"
                onClick={() => changeFilterHandler('active')}>Active</Button>
        <Button variant={props.filter === 'completed' ? "contained" : 'outlined'} color="error"
                onClick={() => changeFilterHandler('completed')}>Completed</Button>
      </div>
    </div>
  );
})

export default Todolist;

