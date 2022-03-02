import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducers/tasksReducer";
import {todolistReducer} from "../reducers/todolistReducer";
import thunk from "redux-thunk";
import {appReducer} from "../reducers/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../reducers/auth-reducers";


let rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer, applyMiddleware(thunk))

// для типизации useSelector (потом используем вместо него)
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector