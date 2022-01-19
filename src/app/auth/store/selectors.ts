import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStateInterface } from '../types';

export const authFeatureSelector =
  createFeatureSelector<AuthStateInterface>('auth');

export const isSubmittedSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitted
);

export const backendErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.backendErrors
);

export const isLoggedSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
);
export const isAnonymousSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn === false
);
export const currentUserSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.currentUser
);
