import {combineReducers, createStore} from "redux";
import {TasksReducer} from "../reducers/TasksReducer";
import {TodolistReducer} from "../reducers/TodolistReducer";


let rootReducer = combineReducers({
  todolists: TodolistReducer,
  tasks: TasksReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)