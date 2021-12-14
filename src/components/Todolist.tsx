import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from "../App";
import MapTasks from "./MapTask";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (todolistId: string,id: string) => void
  changeFilter: (todolistId: string, value: FilterType) => void
  addTask: (todolistId: string, taskTitle: string) => void
  filter: FilterType
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  todolistId: string
  removeTodolist: (todolistId: string) => void
}

const Todolist = (props: PropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<boolean>(false)

  const addTask = () => {
    title.trim() ? props.addTask(props.todolistId, title.trim()) : setError(true)
    setTitle('')
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask()
  }
  const filterAll = () => props.changeFilter(props.todolistId,'all')
  const filterActive = () => props.changeFilter(props.todolistId,'active')
  const filterCompleted = () => props.changeFilter(props.todolistId,'completed')
  const getClassFilterButton = (filter: FilterType) => props.filter === filter ? 'active' : ''

  const errorClass = error ? 'error' : ''
  const errorMessage = error && <div style={{color: 'red'}}>Title is required</div>

  // const tasksJSX = props.tasks.map(task => {
  //   const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todolistId, task.id, e.currentTarget.checked)
  //   const removeTask = () => props.removeTasks(props.todolistId, task.id)
  //   return (
  //     <li key={task.id} className={task.isDone ? 'isDone' : ''}>
  //       <input
  //         type="checkbox"
  //         checked={task.isDone}
  //         onChange={changeStatus}
  //       />
  //       <span>{task.title}</span>
  //       <button onClick={removeTask}>x</button>
  //     </li>
  //   )
  // })

  return (
    <div>
      <h3>{props.title}
      <button onClick={() => props.removeTodolist(props.todolistId)}>x</button>
      </h3>
      <div>
        <input
          value={title}
          onChange={changeTitle}
          onKeyPress={OnKeyPressHandler}
          className={errorClass}/>
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div>
      <MapTasks
        tasks={props.tasks}
        removeTask={props.removeTask}
        todolistId={props.todolistId}
        changeTaskStatus={props.changeTaskStatus}
      />
      <div>
        <button onClick={filterAll} className={getClassFilterButton('all')}>All</button>
        <button onClick={filterActive} className={getClassFilterButton('active')}>Active</button>
        <button onClick={filterCompleted} className={getClassFilterButton('completed')}>Completed</button>
      </div>
    </div>
  );
}

export default Todolist;