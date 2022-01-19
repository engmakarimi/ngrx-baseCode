import { BackendErrors } from '../../../shared/types/backendError';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { ActionTypes } from '../actionTypes';
import { createAction, props } from "@ngrx/store"
import { RegisterRequestInterface } from '../../types';

export const registerAction=createAction(
  ActionTypes.REGISTER,
   props<{request:RegisterRequestInterface}>()
);

export const registerSuccessAction=createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{currentUser:CurrentUserInterface}>()
);
export const registerFailureAction=createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{backendErrors:BackendErrors}>()
  );


