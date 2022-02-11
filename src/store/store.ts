import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/tasksReducer";
import {todolistReducer} from "../reducers/todolistReducer";
import thunk from "redux-thunk";


let rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer
})

export type RootReducerType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer, applyMiddleware(thunk))