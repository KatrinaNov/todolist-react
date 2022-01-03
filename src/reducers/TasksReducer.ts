import {TasksType} from "../App";
import {v1} from "uuid";

type ActionType = removeTaskACType | addTaskACType | changeTaskTitleACType | changeStatusACCType | removeAllTaskACType | addEmptyArrayOfTaskACType

export const TasksReducer = (state: TasksType, action: ActionType) => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.id)}
    }
    case 'REMOVE-ALL-TASKS': {
      delete state[action.payload.id]
      return {...state}
    }
    case 'ADD-TASK': {
      let task = {id: v1(), title: action.payload.title, isDone: false};
      return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]}
    }
    case 'ADD-EMPTY-ARRAY-TASKS': {
      return {...state, [action.payload.id]: []}
    }
    case 'CHANGE-TASK-TITLE': {
      return {...state,
        [action.payload.todolistId]: state[action.payload.todolistId]
          .map(m => m.id === action.payload.id ? {...m, title: action.payload.newTitle} : m)};
    }
    case 'CHANGE-STATUS': {
      return {...state,
        [action.payload.todolistId]: state[action.payload.todolistId]
          .map(m => m.id === action.payload.id ? {...m, isDone: action.payload.isDone} : m)};
    }
    default: return state
  }
};

type removeTaskACType = ReturnType<typeof removeTaskAC>
// action creator
export const removeTaskAC = (id: string, todolistId: string) => {
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
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    payload: {
      title: title,
      todolistId: todolistId
    }

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
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
// action creator
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {
      id,
      newTitle,
      todolistId,
    }
  } as const
}
type changeStatusACCType = ReturnType<typeof changeStatusAC>
// action creator
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
  return {
    type: 'CHANGE-STATUS',
    payload: {
      id,
      isDone,
      todolistId,
    }
  } as const
}



