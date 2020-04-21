import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IUser } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { UserActions } from '../actions/user.action';
import GetUser = UserActions.GetUser;
import GetUserSuccess = UserActions.GetUserSuccess;
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import GetUserFailed = UserActions.GetUserFailed;
import { AuthActions } from '../actions/auth.action';
import SignInVerified = AuthActions.SignInVerified;
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
    ctx.dispatch(new SignInVerified());
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
