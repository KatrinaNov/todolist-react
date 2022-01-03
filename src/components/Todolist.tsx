import React from 'react';
import {FilterType} from "../App";
import MapTasks from "./MapTask";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton, styled} from "@mui/material";
import {Delete} from "@material-ui/icons";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (todolistId: string, id: string) => void
  changeFilter: (todolistId: string, value: FilterType) => void
  addTask: (todolistId: string, taskTitle: string) => void
  filter: FilterType
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  todolistId: string
  removeTodolist: (todolistId: string) => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
  upDateTodolistTitle: (todolistId: string, title: string) => void
}

const Todolist = (props: PropsType) => {

  const changeFilterHandler = (filter:FilterType) => props.changeFilter(props.todolistId, filter)

  const addTaskTitle = (title: string) => {
    props.addTask(props.todolistId, title)
  }
  const upDateTodolistTitle = (title: string) => {
    props.upDateTodolistTitle(props.todolistId, title);
  }
  const removeTodolist = () => props.removeTodolist(props.todolistId)

  return (
    <div>
      {/*<button onClick={removeTodolist} className={'deleteTodolist'}>x</button>*/}
      <h3>
        <EditableSpan title={props.title} upDateItemTitle={upDateTodolistTitle}/>
        <IconButton aria-label="delete">
          <Delete fontSize="inherit" onClick={removeTodolist}/>
        </IconButton>
      </h3>

      <AddItemForm addItemCallback={addTaskTitle}/>

      <MapTasks
        tasks={props.tasks}
        removeTask={props.removeTask}
        todolistId={props.todolistId}
        changeTaskStatus={props.changeTaskStatus}
        updateTaskTitle={props.updateTaskTitle}
      />
      <div>
        <Button variant={props.filter === 'all' ?"contained":'outlined'} color="secondary" onClick={() => changeFilterHandler('all')}>All</Button>
        <Button variant={props.filter === 'active' ?"contained":'outlined'} color="primary" onClick={() => changeFilterHandler('active')}>Active</Button>
        <Button variant={props.filter === 'completed' ?"contained":'outlined'} color="error" onClick={() => changeFilterHandler('completed')}>Completed</Button>
      </div>
      {/*</div>*/}
    </div>
  );
}

export default Todolist;

