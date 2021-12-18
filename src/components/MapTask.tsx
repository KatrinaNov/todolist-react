import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import EditableSpan from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import { Delete } from '@mui/icons-material';

type MapTasksType = {
  tasks: Array<TaskType>
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  todolistId: string
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

const MapTasks = ({tasks, removeTask, todolistId, ...props}: MapTasksType) => {

  const updateTaskTitle = (taskId: string, title: string) => {
    props.updateTaskTitle(todolistId, taskId, title)
  }

  return (
    <ul>
      {
        tasks.map(t => {
          const onClickHandler = () => removeTask(todolistId, t.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(todolistId, t.id, e.currentTarget.checked);
          }
          return <li key={t.id} className={t.isDone ? "task-item is-done" : "task-item"}>
            <Checkbox
              checked={t.isDone}
              onChange={onChangeHandler}
              color="success" />
            {/*<input type="checkbox"*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       checked={t.isDone}/>*/}
            <EditableSpan title={t.title} upDateItemTitle={(title: string) => updateTaskTitle(t.id, title)}/>
            {/*<span>{t.title}</span>*/}
            <IconButton aria-label="delete" onClick={onClickHandler} size={'small'} style={{marginLeft:'auto'}}>
              <Delete />
            </IconButton>
            {/*<button onClick={onClickHandler}>x</button>*/}
          </li>
        })
      }
    </ul>
  );
};

export default MapTasks;