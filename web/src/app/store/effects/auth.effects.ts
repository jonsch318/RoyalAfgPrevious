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
  LoginSuccess, SignOut, SignOutCancelled, SignOutConfirmed, SignOutFailed, SignOutSuccess,
} from '../actions/auth.action';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../services/account/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SignoutDialogComponent } from '../../dialogs/signout/signout.dialog.component';

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
      this.router.navigateByUrl("/").then(() => {});
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

  @Effect()
  signout$ = this.actions$.pipe(
    ofType<SignOut>(AuthActionsTypes.SignOut),
    exhaustMap(() => this._dialogService.open(SignoutDialogComponent).afterClosed()
      .pipe(map(confirmed => {
        if(confirmed)
          return new SignOutConfirmed();
        return new SignOutCancelled();
      })))
  )

  @Effect()
  signoutConfirmed$ = this.actions$.pipe(
    ofType<SignOutConfirmed>(AuthActionsTypes.SignOutConfirmed),
    exhaustMap(auth => this._authService.signout().pipe(
      map(() => new SignOutSuccess()),
      catchError(error => of(new SignOutFailed(error))),
    ))
  );

  constructor(
    private actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _dialogService: MatDialog,
    private readonly router: Router,
  ) {
  }

}
