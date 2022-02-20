import React, {useCallback, useEffect} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@material-ui/icons";
import Task from "./Task";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../reducers/tasksReducer";
import {FilterType} from "../reducers/todolistReducer";
import {RequestStatusType} from "../reducers/app-reducer";

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (todolistId: string, id: string) => void
  changeFilter: (todolistId: string, value: FilterType) => void
  addTask: (todolistId: string, taskTitle: string) => void
  filter: FilterType
  entityStatus: RequestStatusType
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  todolistId: string
  removeTodolist: (todolistId: string) => void
  updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
  upDateTodolistTitle: (todolistId: string, title: string) => void
}

const Todolist = React.memo((props: PropsType) => {

  let dispatch = useDispatch();

  useEffect(() => {dispatch(fetchTasksTC(props.todolistId))}, [dispatch])

  const changeFilterHandler = useCallback((filter: FilterType) => props.changeFilter(props.todolistId, filter),
    [props.changeFilter, props.todolistId]
  )

  const addTaskTitle = useCallback((title: string) => {
    props.addTask(props.todolistId, title)
  }, [props.addTask, props.todolistId])

  const upDateTodolistTitle = useCallback((title: string) => {
    props.upDateTodolistTitle(props.todolistId, title);
  }, [props.upDateTodolistTitle, props.todolistId])

  const removeTodolist = useCallback(() => props.removeTodolist(props.todolistId),
    [props.removeTodolist, props.todolistId]
  )

  let tasksForTodolist = props.tasks

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
  }
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} upDateItemTitle={upDateTodolistTitle}/>
        <IconButton aria-label="delete" onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
          <Delete fontSize="inherit" />
        </IconButton>
      </h3>

      <AddItemForm addItemCallback={addTaskTitle} disabled={props.entityStatus === 'loading'}/>
      <ul>
        {
          tasksForTodolist.map(task => {
            return <Task
              key={task.id}
              task={task}
              removeTask={props.removeTask}
              todolistId={props.todolistId}
              changeTaskStatus={props.changeTaskStatus}
              updateTaskTitle={props.updateTaskTitle}
            />
          })
        }
      </ul>

      <div>
        <Button variant={props.filter === 'all' ? "contained" : 'outlined'} color="secondary"
                onClick={() => changeFilterHandler('all')}>All</Button>
        <Button variant={props.filter === 'active' ? "contained" : 'outlined'} color="primary"
                onClick={() => changeFilterHandler('active')}>Active</Button>
        <Button variant={props.filter === 'completed' ? "contained" : 'outlined'} color="error"
                onClick={() => changeFilterHandler('completed')}>Completed</Button>
      </div>
    </div>
  );
})

export default Todolist;

