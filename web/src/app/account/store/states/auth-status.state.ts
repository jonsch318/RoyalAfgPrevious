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

/**
 * The interface for the AuthStatus State.
 */
export interface IAuthStatusState {
  isSignedIn: boolean;
}

/**
 * The initial values for the AuthStatus State.
 */
export const initialAuthStatusState: IAuthStatusState = {
  isSignedIn: false,
};

/**
 * Stores the State of the Authentication Status. The short version: is the user signed in or not?
 * This gets update with when the Authentication Actions are dispatched.
 */
@State<IAuthStatusState>({
  name: "status",
  defaults: initialAuthStatusState,
})
@Injectable()
export class AuthStatusState {

  /**
   * Selects the status of the Authentication pipeline. In short: Is the user signed in?
   * @param state The state from which the status is selected.
   */
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

  /**
   * Changes the State after the user has successfully signed in.
   * @param ctx The state context
   * @param action The associated action
   */
  @Action(SignInSuccess)
  signInSuccess(ctx: StateContext<IAuthStatusState>, action: SignInSuccess) {
    this._snackBarService.open("You signed in successfully!", "Ok", {
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });
    return ctx.dispatch(new GetUser());
  }

  /**
   * The sign in was verified.
   * @param ctx The state context
   * @param action The action that is processed
   */
  @Action(SignInVerified)
  async signInVerified(ctx: StateContext<IAuthStatusState>, action: SignInVerified) {
    ctx.patchState({
      isSignedIn: true,
    });
    await this._ngZone.run(async () => {
      await this._routerService.navigateByUrl("/");
    });
  }

  /**
   * Changes the state after the user has successfully registered.
   * @param ctx The state context
   * @param action The action that is processed
   */
  @Action(RegisterSuccess)
  registerSuccess(ctx: StateContext<IAuthStatusState>, action: RegisterSuccess){
    this._snackBarService.open("You registered and signed in successfully!", "Ok", {
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
    });
    return ctx.dispatch(new GetUser());
  }

  /**
   * Changes the state after a successful log out process.
   * @param ctx The state context
   * @param action The action that is processed
   */
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
