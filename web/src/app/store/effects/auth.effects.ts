import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthActionsTypes, Login, LoginFailed, LoginSuccess } from '../actions/auth.action';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

  @Effect()
  login$ = this.actions$
    .pipe(
      ofType<Login>(AuthActionsTypes.Login),
      map(action => action.payload),
      exhaustMap(auth =>
      this._authService.signin(auth).pipe(
        map(user => new LoginSuccess(user)),
        catchError(error => of(new LoginFailed({error})))
      ))
    );

  @Effect({dispatch: false})
  loginRedirect$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionsTypes.LoginSuccess),
    map(action => action.payload),
    tap((user) => {
      console.log("new user is: " + user);
      this.router.navigateByUrl("/");
    })
  );

  constructor(
    private actions$: Actions,
    private readonly _authService: AuthService,
    private readonly router: Router,
  ) {
  }

}
