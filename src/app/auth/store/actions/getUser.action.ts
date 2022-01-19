import { BackendErrors } from './../../../shared/types/backendError';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { createAction, props } from "@ngrx/store"
import { ActionTypes } from "../actionTypes"

export const getUserAction=createAction(
  ActionTypes.GET_USER)

export const getUserSuccessAction=createAction(
  ActionTypes.GET_USER_SUCCESS,
  props<{currentUser:CurrentUserInterface}>()
)
export const getUserFailureAction=createAction(
  ActionTypes.GET_USER_FAILURE,
  props<{backendErrors:BackendErrors}>()
  )
