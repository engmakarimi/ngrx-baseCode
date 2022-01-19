import { PersistanceService } from './../../../shared/services/persistance.service';
import {
  registerSuccessAction,
  registerFailureAction,
} from '../actions/register.action';
import { CurrentUserInterface } from 'src/app/shared/types';
import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { registerAction } from '../actions/register.action';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffect {


  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) =>

        this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            console.log('in loginAction map');
            console.log(currentUser)
            this.persistanceService.set('token', currentUser.token);
            return registerSuccessAction({ currentUser:currentUser }) ;
          }),
          catchError((httpError) => {
            return of(
              registerFailureAction({ backendErrors: httpError.error.errors })
            );
          })
        )
      )
    )
  );

  redirectAfterSubmit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerSuccessAction),
      tap(() =>
      this.router.navigateByUrl('/'))
    ), { dispatch: false }
  );


//   failureSubmit$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(registerFailureAction),
//     tap(() =>
//       console.log( 'tap(() =>{ registerFailureAction')
//      )
//   )
// );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private persistanceService: PersistanceService
  ) {}
}
