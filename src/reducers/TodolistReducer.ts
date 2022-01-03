import {FilterType, TodolistsType} from "../App";

type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

export const TodolistReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(f => f.id !== action.payload.id)
    }
    case 'ADD-TODOLIST': {
      return [{id: action.payload.id, title: action.payload.title, filter: 'all'}, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(m => m.id === action.payload.id ? {...m, title: action.payload.title} : m)
    }
    case 'CHANGE-FILTER': {
      return state.map(m => m.id === action.payload.id ? {...m, filter: action.payload.filter} : m)
    }
    default: {
      return state
    }
  }
}
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id: todolistId
    }
  } as const
}
type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolistId: string, title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      id: todolistId,
      title: title
    }
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