import {TasksType} from "../App";
import {addTodolistACType, removeTodolistACType, setTodosACType} from "./todolistReducer";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolists-api";
import {AppRootStateType} from "../store/store";

type ActionType = setTasksACType
  |removeTaskACType
  | addTaskACType
  | UpdateTaskACType
  | removeAllTaskACType
  | addEmptyArrayOfTaskACType
  | addTodolistACType
  | removeTodolistACType
  | setTodosACType

let initialState: TasksType = {
}

export const tasksReducer = (state: TasksType = initialState, action: ActionType) => {
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
      return {...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
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
      delete copy[action.payload.id]
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
export const addTaskAC = (task: TaskType) => {
  return {
    type: 'ADD-TASK',
    task
  } as const
}
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
// type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
// // action creator
// export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
//   return {
//     type: 'CHANGE-TASK-TITLE',
//     payload: {
//       id,
//       newTitle,
//       todolistId,
//     }
//   } as const
// }
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
  return (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items
        const action = setTasksAC(todolistId, tasks)
        dispatch(action)
      })
  }
}


export const removeTaskTC = (todolistId: string, id: string) => {
  return (dispatch: Dispatch) => {
    todolistApi.deleteTask(todolistId, id)
      .then(() => {
        dispatch(removeTaskAC(todolistId, id))
      })
  }
}

export const addTaskTC = (todolistId: string, taskTitle: string) => {
  return (dispatch: Dispatch) => {
    todolistApi.createTask(todolistId, taskTitle)
      .then((res) => {
        dispatch(addTaskAC(res.data.data.item))
      })
  }
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: Date
  deadline?: Date
}

export const updateTaskTC = (todolistId: string, taskId: string,  domainModel: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва

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
      todolistApi.updateTask(todolistId, taskId, apiModel).then(() => {
        const action = updateTaskAC(todolistId, taskId, domainModel)
        dispatch(action)
      })
    }
  }
}






