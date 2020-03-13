import { Action, State, StateContext } from '@ngxs/store';
import { SignInPageState } from './signIn-page.state';
import { AuthStatusState } from './auth-status.state';
import { IUserState, UserState } from './user.state';
import { IUser } from '../../interfaces/user.interface';
import { Injectable } from '@angular/core';


@State({
  name: "auth",
  children: [
    UserState,
    AuthStatusState,
    SignInPageState,
  ]
})
@Injectable()
export class AuthState {

}
