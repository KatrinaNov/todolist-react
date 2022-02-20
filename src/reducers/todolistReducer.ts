import {todolistApi, TodoType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

type ActionType = removeTodolistACType
  | addTodolistACType
  | changeTodolistTitleACType
  | changeFilterACType
  | setTodosACType
  | changeTodolistEntityStatusACType

// export let todolistID1 = v1();
// export let todolistID2 = v1();
export type FilterType = "all" | "active" | "completed"

export type TodolistDomainType = TodoType & {
  filter: FilterType
  entityStatus: RequestStatusType
}

let initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.todolists.map(tl => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle'
      }))
    }
    case 'REMOVE-TODOLIST': {
      return state.filter(f => f.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
    }
    case 'CHANGE-FILTER': {
      return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filter} : m)
    }
    case 'CHANGE-TODOLIST-ENTITY-STATUS': {
      return state.map(m => m.id === action.payload.id ? {...m, entityStatus: action.payload.entityStatus} : m)
    }
    default: {
      return state
    }
  }
}
export type setTodosACType = ReturnType<typeof setTodosAC>
export const setTodosAC = (todolists: Array<TodoType>) => {
  return {
    type: 'SET-TODOLISTS',
    todolists
  } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    id: todolistId
  } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodoType) => {
  return {
    type: 'ADD-TODOLIST',
    todolist
  } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id: todolistId,
      title: title
    }
  } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (filter: FilterType, todolistId: string) => {
  return {
    type: 'CHANGE-FILTER',
    payload: {
      filter,
      id: todolistId
    }
  } as const
}

type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
  return {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    payload: {
      entityStatus,
      id: todolistId
    }
  } as const
}


export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistApi.getTodos()
    .then(res => {
      dispatch(setTodosAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    })
}

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistApi.deleteTodo(todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTodolistAC(todolistId))
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

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTodo(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTodolistAC(res.data.data.item))
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

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.updateTodoTitle(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(changeTodolistTitleAC(todolistId, title))
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