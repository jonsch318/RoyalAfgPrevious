import { Action } from '@ngrx/store';
import { IUser } from '../../interfaces/user';

export enum EUserActions {
  GetUser = "[User] Get User",
  GetUserSuccess = "[User] Get User Success",
  GetSignedIn = "[User] Get Signed In",
  SetUser = "[User] Set User",
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
}

export class GetUserSuccess implements Action{
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) {
  }
}

export class GetSignedIn implements Action {
  public readonly type = EUserActions.GetSignedIn;
}

export class SetUser implements Action{
  public readonly type = EUserActions.SetUser;
  constructor(public payload: IUser) {
  }
}

/**
 * We export the type to provide type checking in the reducers.
 */
export type UserActions = GetUser | GetSignedIn | GetUserSuccess | SetUser;
