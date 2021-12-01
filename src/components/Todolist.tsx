import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType} from "../App";

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTasks: (id: string) => void
  changeFilter: (value: FilterType) => void
  addTask: (taskTitle: string) => void
  filter: FilterType
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

const Todolist = (props: PropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<boolean>(false)

  const addTask = () => {
    title.trim() ? props.addTask(title.trim()) : setError(true)
    setTitle('')
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }
  const OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') addTask()
  }
  const filterAll = () => props.changeFilter('all')
  const filterActive = () => props.changeFilter('active')
  const filterCompleted = () => props.changeFilter('completed')
  const getClassFilterButton = (filter: FilterType) => props.filter === filter ? 'active' : ''

  const errorClass = error ? 'error' : ''
  const errorMessage = error && <div style={{color: 'red'}}>Title is required</div>

  const tasksJSX = props.tasks.map(task => {
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
    const removeTask = () => props.removeTasks(task.id)
    return (
      <li key={task.id} className={task.isDone ? 'isDone' : ''}>
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={changeStatus}
        />
        <span>{task.title}</span>
        <button onClick={removeTask}>x</button>
      </li>
    )
  })

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={title}
          onChange={changeTitle}
          onKeyPress={OnKeyPressHandler}
          className={errorClass}/>
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div>
      <ul>{tasksJSX}</ul>
      <div>
        <button onClick={filterAll} className={getClassFilterButton('all')}>All</button>
        <button onClick={filterActive} className={getClassFilterButton('active')}>Active</button>
        <button onClick={filterCompleted} className={getClassFilterButton('completed')}>Completed</button>
      </div>
    </div>
  );
}

export default Todolist;