import React from 'react';
import {FilterType} from "../App";

type TasksType = {
  id: number
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTasks: (id: number) => void
  changeFilter: (value: FilterType) => void
}

const Todolist = (props: PropsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {props.tasks
          .map(task => <li><input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
            <button onClick={() => props.removeTasks(task.id)}>x</button>
          </li>)}
      </ul>
      <div>
        <button onClick={() => props.changeFilter("all")}>All</button>
        <button onClick={() => props.changeFilter("active")}>Active</button>
        <button onClick={() => props.changeFilter("completed")}>Completed</button>
      </div>
    </div>
  );
}

export default Todolist;