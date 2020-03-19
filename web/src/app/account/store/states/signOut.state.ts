import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AuthActions } from '../actions/auth.action';
import SignOut = AuthActions.SignOut;
import { MatDialog } from '@angular/material/dialog';
import { SignoutDialogComponent } from '../../dialogs/signout/signout.dialog.component';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import SignOutSuccess = AuthActions.SignOutSuccess;
import SignOutFailed = AuthActions.SignOutFailed;
import { UserActions } from '../actions/user.action';
import GetUser = UserActions.GetUser;

export interface ISignOutState {
  pending: boolean,
  errors?: any;
}

export const initialSignOutState: ISignOutState = {
  pending: false,
  errors: null,
};


@State({
  name: "signOut",
  defaults: initialSignOutState,
})
@Injectable()
export class SignOutState {

  constructor(
    private readonly _dialogService: MatDialog,
    private readonly _authService: AuthService,
  ) {
  }

  @Action(SignOut)
  signOut(ctx: StateContext<ISignOutState>, action: SignOut){
    ctx.patchState({
      pending: true,
    });
    this._dialogService.open(SignoutDialogComponent).afterClosed().pipe(
      tap((res) => {
        console.log("Dialog Closed");
        console.log(res)
      }),
    );

/*    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this._authService.signOut().pipe(
          map(() => {
            ctx.dispatch(new SignOutSuccess());
            ctx.dispatch(new GetUser());
          }),
          catchError(err => ctx.dispatch(new SignOutFailed(err))),
        )
      }
    })*/
  }

  @Action(SignOutFailed)
  signOutFailed(ctx: StateContext<ISignOutState>, action: SignOutFailed){
    console.log("Sign out Failed with error: " + action.error);
    ctx.patchState({
      pending: false,
      errors: action.error,
    });
  }
}

/*

*/
