import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/TasksReducer";
import {todolistReducer} from "../reducers/TodolistReducer";


let rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)