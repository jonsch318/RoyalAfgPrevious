import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthActions } from '../actions/auth.action';
import SignInSuccess = AuthActions.SignInSuccess;
import { UserActions } from '../actions/user.action';
import GetUser = UserActions.GetUser;
import { IUser } from '../../interfaces/user.interface';
import SignOutSuccess = AuthActions.SignOutSuccess;
import { UserService } from '../../services/user.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import GetUserSuccess = UserActions.GetUserSuccess;
import GetUserFailed = UserActions.GetUserFailed;
import { of } from 'rxjs';
import SetUser = UserActions.SetUser;

export interface IUserState {
  user?: IUser,
}

export const initialUserState: IUserState = {
  user: null,
};

@State<IUserState>({
  name: "user",
  defaults: initialUserState,
})
@Injectable()
export class UserState {

  constructor(
    private readonly _userService: UserService,
  ) {
  }

  @Selector()
  static getUser(state: IUserState){
    return state.user;
  }

  @Action(GetUser)
  getUser(ctx: StateContext<IUserState>, action: GetUser){
    return this._userService.getUser().pipe(
      map(user => ctx.dispatch(new GetUserSuccess(user))),
      catchError(error =>
        of(ctx.dispatch(new GetUserFailed(error))
      ))
    );
  }

  @Action(GetUserSuccess)
  getUserSuccess(ctx: StateContext<IUserState>, action: GetUserSuccess){
    return ctx.patchState({
      user: action.user,
    });
  }

  @Action(SetUser)
  setUser(ctx: StateContext<IUserState>, action: SetUser){
    return ctx.patchState({
      user: action.user,
    });
  }

}
