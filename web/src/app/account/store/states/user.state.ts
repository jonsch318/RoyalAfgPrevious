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

/**
 * The interface for the user state.
 */
export interface IUserState {
  user?: IUser;
}

/**
 * The initial state of the user state.
 */
export const initialUserState: IUserState = {
  user: null,
};

/**
 * The state of the user.
 */
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

  /**
   * Enables Selection of the currently signed in user.
   * @param state The UserState from which the user is selected.
   */
  @Selector()
  static getUser(state: IUserState){
    return state.user;
  }

  /**
   * kicks of the user service which fetches information from the server about the currently signed in user.
   * @param ctx
   * @param action
   */
  @Action(GetUser)
  getUser(ctx: StateContext<IUserState>, action: GetUser){
    return this._userService.getUser().pipe(
      map(user => {
        if(user)
          ctx.dispatch(new GetUserSuccess(user));
      }),
      catchError(error =>
        of(ctx.dispatch(new GetUserFailed(error))
      ))
    );
  }

  /**
   * The user is correctly logged in. Dispatches the SignInVerified to change the Auth-Status State.
   * @param ctx
   * @param action
   */
  @Action(GetUserSuccess)
  getUserSuccess(ctx: StateContext<IUserState>, action: GetUserSuccess){
    ctx.dispatch(new SignInVerified());
    return ctx.patchState({
      user: action.user,
    });
  }

  /**
   * Sets the State for the new User
   * @param ctx
   * @param action
   */
  @Action(SetUser)
  setUser(ctx: StateContext<IUserState>, action: SetUser){
    return ctx.patchState({
      user: action.user,
    });
  }

}
