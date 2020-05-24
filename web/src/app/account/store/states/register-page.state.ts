import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SignInPageActions } from '../actions/signIn-page.action';
import SignIn = SignInPageActions.SignIn;
import { catchError, map } from 'rxjs/operators';
import { AuthActions } from '../actions/auth.action';
import SignInSuccess = AuthActions.SignInSuccess;
import SignInFailed = AuthActions.SignInFailed;
import { of } from 'rxjs';
import { criticalError, invalidCredentials } from '../errors/signIn-page.errors';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterPageActions } from '../actions/register-page.action';
import Register = RegisterPageActions.Register;
import RegisterFailed = AuthActions.RegisterFailed;
import RegisterSuccess = AuthActions.RegisterSuccess;


/**
 * The interface for the register page state.
 */
export interface IRegisterPageState {
  pending: boolean;
  error: string | null;
}

/**
 * The initial state of the RegisterPage State.
 */
export const initialRegisterPageState: IRegisterPageState = {
  pending: false,
  error: null,
};

export const REGISTERPAGE_STATE_TOKEN = new StateToken<IRegisterPageState>("registerPage");

/**
 * The state of the registration page. Determines if any errors are present.
 * This state dispatches new Actions which change mainly the Auth-status State.
 */
@State({
  name: REGISTERPAGE_STATE_TOKEN,
  defaults: initialRegisterPageState,
})
@Injectable()
export class RegisterPageState {

  @Selector()
  static getRegisterError(state: IRegisterPageState) {
    return state.error;
  }



  constructor(
    private readonly _authService: AuthService,
  ) {
  }

  /**
   * kicks of the registration process via the auth service.
   * @param ctx
   * @param action Contains the necessary information for the server.
   */
  @Action(Register)
  register(ctx: StateContext<IRegisterPageState>, action: Register){
    ctx.patchState({
      pending: true,
    });
    return this._authService.register(action.registerDto).pipe(
      map(data => {
        if (data.error !== "") {
          return ctx.dispatch(new RegisterFailed("Something went wrong during the registration"));
        }
        return ctx.dispatch(new RegisterSuccess());
      }),
      catchError(err => {
        return ctx.dispatch(new RegisterFailed("Something went wrong during the registration"));
      })
    );
  }

  /**
   * The registration process was unsuccessful display the errors of the process.
   * @param ctx
   * @param action
   */
  @Action(RegisterFailed)
  registerFailed(ctx: StateContext<IRegisterPageState>, action: RegisterFailed){
    return ctx.patchState({
      pending: false,
      error: action.error
    });
  }

}
