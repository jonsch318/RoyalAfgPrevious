import { IUser } from '../../interfaces/user.interface';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { AuthService } from '../../services/auth.service';
import { AuthActions } from '../actions/auth.action';
import SignInSuccess = AuthActions.SignInSuccess;
import { UserActions } from '../actions/user.action';
import GetUser = UserActions.GetUser;
import { SignInPageActions } from '../actions/signIn-page.action';
import SignIn = SignInPageActions.SignIn;
import { catchError, exhaustMap, map } from 'rxjs/operators';
import SignInFailed = AuthActions.SignInFailed;
import { UserService } from '../../services/user.service';
import GetUserSuccess = UserActions.GetUserSuccess;
import { of } from 'rxjs';
import GetUserFailed = UserActions.GetUserFailed;
import SignOut = AuthActions.SignOut;
import { MatDialog } from '@angular/material/dialog';
import { SignoutDialogComponent } from '../../../dialogs/signout/signout.dialog.component';
import SignOutConfirmed = AuthActions.SignOutConfirmed;
import { SignOutCancelled } from '../../../store/actions/auth.action';

export interface IUserState {
  user: IUser
}

export const initialUserState: IUserState = {
  user: null,
};

export const USER_STATE_TOKEN = new StateToken<IUserState>("user");

@State({
  name: USER_STATE_TOKEN,
  defaults: initialUserState
})
export class UserState{

  constructor(
    protected readonly _userService: UserService,
    private readonly _authService: AuthService,
    private readonly _dialogService: MatDialog,
  ) {
  }

  @Selector()
  static isSignedIn(state: IUserState){
    return !!state.user
  }


  @Action(SignIn)
  signIn(ctx: StateContext<IUserState>, action: SignIn) {
    return this._authService.signIn(action.signInDto).pipe(
      map(() => ctx.dispatch(new SignInSuccess())),
      catchError(error => of(ctx.dispatch(new SignInFailed(error))))
    );
  }

  @Action(SignInSuccess)
  signInSuccess(ctx: StateContext<IUserState>, action: SignInSuccess){
    ctx.dispatch(new GetUser())
  }

  @Action(SignOut)
  signOut(ctx: StateContext<IUserState>, action: SignOut){
    return this._dialogService.open(SignoutDialogComponent).afterClosed()
      .pipe(map(confirmed => {
        if(confirmed)
          return new SignOutConfirmed();
        return new SignOutCancelled();
      }))
  }


  @Action(GetUser)
  getUser(ctx: StateContext<IUserState>, action: GetUser){
    return this._userService.getUser().pipe(
      map(user => ctx.dispatch(new GetUserSuccess(user))),
      catchError(error => of(ctx.dispatch(new GetUserFailed(error))))
    );
  }

  @Action(GetUserSuccess)
  getUserSuccess(ctx: StateContext<IUserState>, action: GetUserSuccess){
    ctx.patchState({
      user: action.user,
    })
  }
}
