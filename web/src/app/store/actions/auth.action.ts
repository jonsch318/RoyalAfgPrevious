import { Action } from '@ngrx/store';
import { LoginDto } from '../../../../../server/src/auth/dtos/login-dto';
import { IUser } from '../../interfaces/user';

export enum AuthActionsTypes {
  Login = "[Login Page] Login",
  LoginSuccess = "[Auth] Login Success",
  LoginFailed = "[Auth] Login Failed",
  LoadUser = "[User] Load User",
  LoadUserSuccess = "[User] Load User Success",
  LoadUserFailed = "[User] Load User Failed",
  SignOutSuccess = "[Auth] Sign out Success",
  SignOutFailed = "[Auth] Sign out Failed",
  SignOut = "[SignOut Page] SignOut",
  SignOutConfirmed = "[SignOut Page] SignOut Confirmed",
  SignOutCancelled = "[SignOut Page] SignOut Cancelled",
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

export class LoadUser implements Action{
  readonly type = AuthActionsTypes.LoadUser;
}

export class LoadUserSuccess implements Action{
  readonly type = AuthActionsTypes.LoadUserSuccess;

  constructor(public payload: IUser) {
  }
}

export class LoadUserFailed implements Action{
  readonly type = AuthActionsTypes.LoadUserFailed;

  constructor(public payload: any) {
  }
}

export class SignOut implements Action{
  readonly type = AuthActionsTypes.SignOut;
}

export class SignOutConfirmed implements Action{
  readonly type = AuthActionsTypes.SignOutConfirmed;
}

export class SignOutCancelled implements Action{
  readonly type = AuthActionsTypes.SignOutCancelled;
}

export class SignOutSuccess implements Action{
  readonly type = AuthActionsTypes.SignOutSuccess;
}

export class SignOutFailed implements Action{
  readonly type = AuthActionsTypes.SignOutFailed;

  constructor(public payload: any) {
  }
}

export type AuthActions =
  Login |
  LoginSuccess |
  LoginFailed|
  LoadUser|
  LoadUserFailed|
  LoadUserSuccess|
  SignOut|
  SignOutConfirmed|
  SignOutCancelled|
  SignOutSuccess|
  SignOutFailed;
