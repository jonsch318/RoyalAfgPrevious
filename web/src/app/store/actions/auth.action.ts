import { Action } from '@ngrx/store';
import { LoginDto } from '../../../../../server/src/auth/dtos/login-dto';
import { IUser } from '../../interfaces/user';

export enum AuthActionsTypes {
  Login = "[Login Page] Login",
  LoginSuccess = "[Auth] Login Success",
  LoginFailed = "[Auth] Login Failed",
}

export class Login implements Action {
  readonly type = AuthActionsTypes.Login;

  constructor(public payload: LoginDto) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionsTypes.LoginSuccess;

  constructor(public payload: IUser) {
  }
}

export class LoginFailed implements Action {
  readonly type = AuthActionsTypes.LoginFailed;

  constructor(public payload: any) {
  }
}

export type AuthActions =
  Login |
  LoginSuccess |
  LoginFailed;
