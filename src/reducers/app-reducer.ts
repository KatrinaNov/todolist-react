import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "./auth-reducers";
import {handleServerAppError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

export type setAppStatusACType = ReturnType<typeof setAppStatusAC >
export const setAppStatusAC  = (status: RequestStatusType) => ({type: 'APP/SET-STATUS',status} as const)
export type setAppErrorACType = ReturnType<typeof setAppErrorAC >
export const setAppErrorAC  = (error: string | null) => ({type: 'APP/SET-ERROR',error} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
}



export type AppActionsType = setAppStatusACType | setAppErrorACType