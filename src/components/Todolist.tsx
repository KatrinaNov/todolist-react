import React from 'react';
import {FilterType} from "../App";
import MapTasks from "./MapTask";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, styled} from "@mui/material";

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

const FilterButton = styled(Button)({
  fontSize: '14px',
  padding: '3px 15px',
  minWidth: 'auto',
  textTransform: 'none',
  backgroundColor: 'transparent',
  borderColor: '#aaa',
  color: '#aaa',
  '&:hover': {
    color: 'green',
    borderColor: 'green',
  },
  '&.active': {
    backgroundColor: 'green',
    borderColor: 'green',
    color: 'white'
  },
});

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
      <button onClick={removeTodolist} className={'deleteTodolist'}>x</button>
      <h3>
        <EditableSpan title={props.title} upDateItemTitle={upDateTodolistTitle}/>
      </h3>

      <AddItemForm addItemCallback={addTaskTitle} placeholder={'Добавьте задачу...'}/>

      <MapTasks
        tasks={props.tasks}
        removeTask={props.removeTask}
        todolistId={props.todolistId}
        changeTaskStatus={props.changeTaskStatus}
        updateTaskTitle={props.updateTaskTitle}
      />
      <div className={'buttons-block'}>
        <FilterButton
          onClick={() => changeFilterHandler('all')}
          className={getClassFilterButton('all')}
          variant="outlined"
        >
          All
        </FilterButton>
        <FilterButton
          onClick={() => changeFilterHandler('active')}
          className={getClassFilterButton('active')}
          variant="outlined"
        >
          Active
        </FilterButton>
        <FilterButton
          onClick={() => changeFilterHandler('completed')}
          className={getClassFilterButton('completed')}
          variant="outlined"
        >
          Completed
        </FilterButton>
        {/*<button onClick={() => changeFilterHandler('all')} className={getClassFilterButton('all')}>All</button>*/}
        {/*<button onClick={() => changeFilterHandler('active')} className={getClassFilterButton('active')}>Active</button>*/}
        {/*<button onClick={() => changeFilterHandler('completed')} className={getClassFilterButton('completed')}>Completed</button>*/}
      </div>
    </div>
  );
}

export default Todolist;

