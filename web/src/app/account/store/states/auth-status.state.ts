import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IUserState, UserState } from './user.state';
import { AuthActions } from '../actions/auth.action';
import SignInSuccess = AuthActions.SignInSuccess;
import { UserActions } from '../actions/user.action';
import GetUser = UserActions.GetUser;
import { IUser } from '../../interfaces/user.interface';
import SignOutSuccess = AuthActions.SignOutSuccess;

export interface IAuthStatusState {
  user?: IUser,
  isSignedIn: boolean,
}

export const initialAuthStatusState: IAuthStatusState = {
  user: null,
  isSignedIn: false,
};


@State<IAuthStatusState>({
  name: "status",
  children: [
    UserState
  ]
})
export class AuthStatusState {

  @Selector()
  static getSignedIn(state: IAuthStatusState){
    return state.isSignedIn;
  }

  @Selector()
  static getUser(state: IAuthStatusState){
    return state.user;
  }


  @Action(SignInSuccess)
  signInSuccess(ctx: StateContext<IAuthStatusState>, action: SignInSuccess){
    ctx.dispatch(new GetUser())
  }

  @Action(SignOutSuccess)
  signOutSuccess(ctx: StateContext<IAuthStatusState>, action: SignOutSuccess){
    ctx.patchState({
      user: null,
      isSignedIn: false,
    })
  }



}
