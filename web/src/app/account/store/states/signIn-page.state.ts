import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { UserState } from './user.state';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SignInPageActions } from '../actions/signIn-page.action';
import SignIn = SignInPageActions.SignIn;
import { catchError, map } from 'rxjs/operators';
import { AuthActions } from '../actions/auth.action';
import SignInSuccess = AuthActions.SignInSuccess;
import { of } from 'rxjs';
import SignInFailed = AuthActions.SignInFailed;

export interface ISignInPageState {
  pending: boolean,
  error: string | null,
}

export const initialSignInPageState: ISignInPageState = {
  pending: false,
  error: null,
};

export const SIGNINPAGE_STATE_TOKEN = new StateToken<ISignInPageState>("signInPage");

@State({
  name: SIGNINPAGE_STATE_TOKEN,
  defaults: initialSignInPageState,
})
@Injectable()
export class SignInPageState {

  constructor(
    private readonly _authService: AuthService,
  ) {
  }

  @Action(SignIn)
  signIn(ctx: StateContext<ISignInPageState>, action: SignIn){
    ctx.patchState({
      pending: true,
    });
    return this._authService.signIn(action.signInDto).pipe(
      map(() => ctx.dispatch(new SignInSuccess())),
      catchError(error => of(ctx.dispatch(new SignInFailed(error)))),
    );
  }

  @Action(SignInFailed)
  signInFailed(ctx: StateContext<ISignInPageState>, action: SignInFailed){
    return ctx.patchState({
      pending: false,
      error: action.error,
    });
  }

}
