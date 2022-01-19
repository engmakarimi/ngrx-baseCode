import {
  loginFailureAction,
  loginAction,
  loginSuccessAction,
} from './../actions/login.action';
import { PersistanceService } from './../../../shared/services/persistance.service';
import { CurrentUserInterface } from 'src/app/shared/types';
import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('token', currentUser.token);
            return loginSuccessAction({ currentUser });
          }),
          catchError((httpError: HttpErrorResponse) => {
            console.log('in loginAction')
            return of(
              loginFailureAction({ backendErrors: httpError.error.errors })
            );
          })
        );
      })
    )
  );

  redirectAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => this.router.navigateByUrl('/'))
    ), { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private persistanceService: PersistanceService
  ) {}
}
