import {FilterType, TasksType, TodolistsType} from "../App";
import {v1} from "uuid";

type ActionType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

export let todolistID1 = v1();
export let todolistID2 = v1();

let initialState: Array<TodolistsType> = [
  {id: todolistID1, title: 'What to learn', filter: 'all'},
  {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const TodolistReducer = (state: Array<TodolistsType> = initialState, action: ActionType): Array<TodolistsType> => {
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