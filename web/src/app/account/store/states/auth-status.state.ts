import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthActions } from '../actions/auth.action';
import SignInSuccess = AuthActions.SignInSuccess;
import { UserActions } from '../actions/user.action';
import GetUser = UserActions.GetUser;
import { IUser } from '../../interfaces/user.interface';
import SignOutSuccess = AuthActions.SignOutSuccess;
import { Injectable } from '@angular/core';
import SetUser = UserActions.SetUser;
import { UserState } from './user.state';

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

  @Action(SignInSuccess)
  signInSuccess(ctx: StateContext<IAuthStatusState>, action: SignInSuccess){
    ctx.dispatch(new GetUser());
    ctx.patchState({
      isSignedIn: true,
    })
  }

  @Action(SignOutSuccess)
  signOutSuccess(ctx: StateContext<IAuthStatusState>, action: SignOutSuccess){
    ctx.dispatch(new SetUser(null));
    ctx.patchState({
      isSignedIn: false,
    })
  }



}
