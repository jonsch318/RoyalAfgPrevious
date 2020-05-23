import { Injectable, NgZone } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Router } from '@angular/router';
import { AuthActions } from '../actions/auth.action';
import SignInSuccess = AuthActions.SignInSuccess;
import { UserActions } from '../actions/user.action';
import GetUser = UserActions.GetUser;
import SignInVerified = AuthActions.SignInVerified;
import SignOutSuccess = AuthActions.SignOutSuccess;
import { MatSnackBar } from '@angular/material/snack-bar';
import RegisterSuccess = AuthActions.RegisterSuccess;

export interface IAuthStatusState {
  isSignedIn: boolean;
}

export const initialAuthStatusState: IAuthStatusState = {
  isSignedIn: false,
};


@State<IAuthStatusState>({
  name: "status",
  defaults: initialAuthStatusState,
})
@Injectable()
export class AuthStatusState {

  @Selector()
  static getSignedIn(state: IAuthStatusState){
    return state.isSignedIn;
  }

  constructor(
    private readonly _routerService: Router,
    private readonly _ngZone: NgZone,
    private readonly _snackBarService: MatSnackBar,
  ) {
  }

  @Action(SignInSuccess)
  signInSuccess(ctx: StateContext<IAuthStatusState>, action: SignInSuccess) {
    this._snackBarService.open("You signed in successfully!", "Ok", {
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });
    return ctx.dispatch(new GetUser());
  }

  @Action(SignInVerified)
  async signInVerified(ctx: StateContext<IAuthStatusState>, action: SignInVerified) {
    ctx.patchState({
      isSignedIn: true,
    });
    await this._ngZone.run(async () => {
      await this._routerService.navigateByUrl("/");
    });
  }

  @Action(RegisterSuccess)
  registerSuccess(ctx: StateContext<IAuthStatusState>, action: RegisterSuccess){
    this._snackBarService.open("You registered and signed in successfully!", "Ok", {
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });
    return ctx.dispatch(new GetUser());
  }

  @Action(SignOutSuccess)
  async signOutSuccess(ctx: StateContext<IAuthStatusState>, action: SignOutSuccess) {
    ctx.dispatch(new GetUser());
    ctx.patchState({
      isSignedIn: false,
    });

    this._snackBarService.open("You signed out successfully!", "Ok", {
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });

    await this._ngZone.run(async () => {
      await this._routerService.navigateByUrl("/");
    });
  }

}
