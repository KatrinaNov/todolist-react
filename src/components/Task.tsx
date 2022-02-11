import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
  task: TaskType
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  todolistId: string
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

const Task = React.memo((props: TaskPropsType) => {

  const onClickHandler = () => props.removeTask(props.todolistId, props.task.id)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.todolistId, props.task.id, e.currentTarget.checked);
  }
  const updateTaskTitle = useCallback((taskId: string, title: string) => {
    props.updateTaskTitle(props.todolistId, taskId, title)
  }, [props.updateTaskTitle, props.todolistId])

  return <li key={props.task.id} className={props.task.isDone ? "task-item is-done" : "task-item"}>
    <Checkbox
      checked={props.task.isDone}
      onChange={onChangeHandler}
      color="success" />
    <EditableSpan title={props.task.title} upDateItemTitle={(title: string) => updateTaskTitle(props.task.id, title)}/>
    <IconButton aria-label="delete" onClick={onClickHandler} size={'small'} style={{marginLeft:'auto'}}>
      <Delete />
    </IconButton>
  </li>

});

export default Task;