import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthActions } from '../actions/auth.action';
import SignInSuccess = AuthActions.SignInSuccess;
import { UserActions } from '../actions/user.action';
import GetUser = UserActions.GetUser;
import SignOutSuccess = AuthActions.SignOutSuccess;
import { Injectable } from '@angular/core';
import SignInVerified = AuthActions.SignInVerified;
import { Router } from '@angular/router';

export interface IAuthStatusState {
  isSignedIn: boolean,
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
    private readonly _routerService: Router
  ) {
  }

  @Action(SignInSuccess)
  signInSuccess(ctx: StateContext<IAuthStatusState>, action: SignInSuccess){
    return ctx.dispatch(new GetUser());
  }

  @Action(SignInVerified)
  async signInVerified(ctx: StateContext<IAuthStatusState>, action: SignInVerified){
    ctx.patchState({
      isSignedIn: true,
    });
    await this._routerService.navigateByUrl("/");
  }

  @Action(SignOutSuccess)
  async signOutSuccess(ctx: StateContext<IAuthStatusState>, action: SignOutSuccess){
    ctx.dispatch(new GetUser());
    ctx.patchState({
      isSignedIn: false,
    });
    await this._routerService.navigateByUrl("/");
  }

}
