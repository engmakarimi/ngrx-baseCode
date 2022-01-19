import { BackendErrors } from './../../../shared/types/backendError';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { createAction, props } from "@ngrx/store"
import { ActionTypes } from "../actionTypes"
import { LoginRequestInterface } from '../../types/loginRequest.interface';

export const loginAction=createAction(
  ActionTypes.LOGIN,
   props<{request:LoginRequestInterface}>()
)

export const loginSuccessAction=createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{currentUser:CurrentUserInterface}>()
)
export const loginFailureAction=createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{backendErrors:BackendErrors}>()
  )
