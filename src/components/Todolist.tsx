import React from 'react';
import {FilterType} from "../App";
import MapTasks from "./MapTask";
import AddItemForm from "./AddItemForm";

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

  const filterAll = () => props.changeFilter(props.todolistId,'all')
  const filterActive = () => props.changeFilter(props.todolistId,'active')
  const filterCompleted = () => props.changeFilter(props.todolistId,'completed')
  const getClassFilterButton = (filter: FilterType) => props.filter === filter ? 'active' : ''

  const addTaskTitle = (title: string) => {props.addTask(props.todolistId, title)}


  return (
    <div>
      <h3>{props.title}
      <button onClick={() => props.removeTodolist(props.todolistId)}>x</button>
      </h3>
      <AddItemForm addItemCallback={addTaskTitle}/>
      {/*<div>*/}
      {/*  <input*/}
      {/*    value={title}*/}
      {/*    onChange={changeTitle}*/}
      {/*    onKeyPress={OnKeyPressHandler}*/}
      {/*    className={errorClass}/>*/}
      {/*  <button onClick={addTask}>+</button>*/}
      {/*  {errorMessage}*/}
      {/*</div>*/}
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

