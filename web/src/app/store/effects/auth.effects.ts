import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import {
  AuthActionsTypes,
  LoadUser,
  LoadUserFailed,
  LoadUserSuccess,
  Login,
  LoginFailed,
  LoginSuccess,
} from '../actions/auth.action';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../services/account/user.service';

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

  @Effect()
  loadUser$ = this.actions$.pipe(
    ofType<LoadUser>(AuthActionsTypes.LoadUser),
    exhaustMap(() => this._userService.getUser()
      .pipe(
        map(user => new LoadUserSuccess(user)),
        catchError(error => of(new LoadUserFailed(error))),
      ))
  );

  constructor(
    private actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly router: Router,
  ) {
  }

}
