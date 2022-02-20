import {addTodolistACType, removeTodolistACType, setTodosACType} from "./todolistReducer";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolists-api";
import {AppRootStateType} from "../store/store";
import {AppActionsType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type TasksType = {
  [key: string]: Array<TaskType>
}

type ActionType = setTasksACType
  | removeTaskACType
  | addTaskACType
  | UpdateTaskACType
  | removeAllTaskACType
  | addEmptyArrayOfTaskACType
  | addTodolistACType
  | removeTodolistACType
  | setTodosACType
  | AppActionsType

let initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
  switch (action.type) {
    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.id)
      }
    }
    case 'ADD-TASK': {
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      }
    }
    case 'UPDATE-TASk': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(m => m.id === action.id ? {...m, ...action.model} : m)
      };
    }
    case 'SET-TODOLISTS': {
      const stateCopy = {...state}
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy;
    }
    case 'ADD-TODOLIST': {
      return {...state, [action.todolist.id]: []}
    }
    case 'REMOVE-TODOLIST': {
      let copy = {...state}
      delete copy[action.id]
      return copy
    }

    default:
      return state
  }
};

type setTasksACType = ReturnType<typeof setTasksAC>
// action creator
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return {
    type: 'SET-TASKS',
    payload: {
      tasks,
      todolistId
    }

  } as const
}
type removeTaskACType = ReturnType<typeof removeTaskAC>
// action creator
export const removeTaskAC = (todolistId: string, id: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id: id,
      todolistId: todolistId
    }

  } as const
}
type removeAllTaskACType = ReturnType<typeof removeAllTaskAC>
// action creator
export const removeAllTaskAC = (id: string) => {
  return {
    type: 'REMOVE-ALL-TASKS',
    payload: {
      id: id,
    }

  } as const
}
type addTaskACType = ReturnType<typeof addTaskAC>
// action creator
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)

type addEmptyArrayOfTaskACType = ReturnType<typeof addEmptyArrayOfTaskAC>
// action creator
export const addEmptyArrayOfTaskAC = (id: string) => {
  return {
    type: 'ADD-EMPTY-ARRAY-TASKS',
    payload: {
      id,
    }
  } as const
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: Date
  deadline?: Date
}
type UpdateTaskACType = ReturnType<typeof updateTaskAC>

// action creator
export const updateTaskAC = (todolistId: string, id: string, model: UpdateDomainTaskModelType) => {
  return {
    type: 'UPDATE-TASk',
    id,
    todolistId,
    model,
  } as const
}



export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTasks(todolistId)
      .then((res) => {
        dispatch(setTasksAC(todolistId, res.data.items))
        dispatch(setAppStatusAC('succeeded'))
      })
  }
}

export const removeTaskTC = (todolistId: string, id: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.deleteTask(todolistId, id)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTaskAC(todolistId, id))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch)
      })
  }
}

export const addTaskTC = (todolistId: string, taskTitle: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    todolistApi.createTask(todolistId, taskTitle)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error.message, dispatch)
      })
  }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
      return t.id === taskId
    })
    if (!task) {
      console.warn('task not found in state')
      return;
    }
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      startDate: task.startDate,
      priority: task.priority,
      description: task.description,
      deadline: task.deadline,
      status: task.status,
      ...domainModel
    }

    if (task) {
      todolistApi.updateTask(todolistId, taskId, apiModel)
        .then(res => {
          if (res.data.resultCode === 0) {
            dispatch(updateTaskAC(todolistId, taskId, domainModel))
            dispatch(setAppStatusAC('succeeded'))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(error.message, dispatch)
        })
    }
  }
}