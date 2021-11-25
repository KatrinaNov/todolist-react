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
}

const Todolist = (props: PropsType) => {
  let [title, setTitle] = useState("");

  const tasksJSX = props.tasks.map(task => {
      return (
      <li><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
        <button onClick={() => props.removeTasks(task.id)}>x</button>
      </li>
      )
  })
  const addTask = () => {
    props.addTask(title)
    setTitle('')
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if (e.key === 'Enter') addTask()}
  const filterAll = () => props.changeFilter('all')
  const filterActive = () => props.changeFilter('active')
  const filterCompleted = () => props.changeFilter('completed')


  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={title} onChange={changeTitle} onKeyPress={OnKeyPressHandler}/>
        <button onClick={addTask}>+</button>
      </div>
      <ul>{tasksJSX}</ul>
      <div>
        <button onClick={filterAll}>All</button>
        <button onClick={filterActive}>Active</button>
        <button onClick={filterCompleted}>Completed</button>
      </div>
    </div>
  );
}

export default Todolist;