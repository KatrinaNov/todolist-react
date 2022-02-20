import { Dispatch } from 'redux';
import {BaseResponseType} from '../api/todolists-api';
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../reducers/app-reducer";

// generic function
export const handleServerAppError = <T>(data: BaseResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppErrorAC(error))
  dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<AppActionsType>