import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";
import EditableSpan from "./EditableSpan";

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
          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <EditableSpan title={t.title} upDateItemTitle={(title: string) => updateTaskTitle(t.id, title)}/>
            {/*<span>{t.title}</span>*/}
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
  );
};

export default MapTasks;