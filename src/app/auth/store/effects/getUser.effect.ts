import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { AuthService } from './../../services/auth.service';
import {
  getUserAction,
  getUserSuccessAction,
  getUserFailureAction,
} from './../actions/getUser.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
@Injectable()
export class GetUserEffect {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserAction),
      switchMap(() =>
        this.authService.getUserProfile().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getUserSuccessAction({ currentUser: currentUser });
          }),
          catchError((httpError) => {
            return of(
              getUserFailureAction({ backendErrors: httpError.error.errors })
            );
          })
        )
      )
    )
  );
  constructor(private actions$: Actions, private authService: AuthService) {}
}
