import React from 'react';
import {FilterType} from "../App";
import MapTasks from "./MapTask";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
  const getClassFilterButton = (filter: FilterType) => props.filter === filter ? 'active' : ''

  const addTaskTitle = (title: string) => {
    props.addTask(props.todolistId, title)
  }
  const upDateTodolistTitle = (title: string) => {
    props.upDateTodolistTitle(props.todolistId, title);
  }
  const removeTodolist = () => props.removeTodolist(props.todolistId)

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} upDateItemTitle={upDateTodolistTitle}/>
        <button onClick={removeTodolist}>x</button>
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
        <button onClick={() => changeFilterHandler('all')} className={getClassFilterButton('all')}>All</button>
        <button onClick={() => changeFilterHandler('active')} className={getClassFilterButton('active')}>Active</button>
        <button onClick={() => changeFilterHandler('completed')} className={getClassFilterButton('completed')}>Completed</button>
      </div>
    </div>
  );
}

export default Todolist;

