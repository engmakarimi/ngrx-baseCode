import { getUserFailureAction, getUserSuccessAction, getUserAction } from './actions/getUser.action';
 import { loginAction, loginSuccessAction, loginFailureAction } from './actions/login.action';
import { Action, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types';
import {
  registerAction,
  registerSuccessAction,
  registerFailureAction,
} from './actions/register.action';

const initialState: AuthStateInterface = {
  isSubmitted: false,
  isLoggedIn: null,
  backendErrors: null,
  currentUser: null,
  isLoading:false
};

const authReducer = createReducer(
  initialState,
  //#region register reducer
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitted: true,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitted: false,
      isLoggedIn: true,
      backendErrors:null,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitted: false,
      backendErrors: action.backendErrors,
    })
  ),
  //#endregion

  //#region login reducer
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitted: true,
      backendErrors:null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitted: false,
      isLoggedIn: true,
      backendErrors:null,
      currentUser: action.currentUser,
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitted: false,
      isLoggedIn: false,
      backendErrors: action.backendErrors,
    })
  ),
  //#endregion

  //#region get user

  on(
    getUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitted: false,
      isLoggedIn: false,
      isLoading:true,
    })
  ),
  on(
    getUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitted: false,
      isLoggedIn: true,
      isLoading:false,
      backendErrors: null,
      currentUser: action.currentUser
    })
  ),
  on(
    getUserFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitted: false,
      isLoggedIn: false,
      isLoading:false,
      backendErrors: action.backendErrors,
    })
  )
  //#endregion
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
