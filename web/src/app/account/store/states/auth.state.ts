import { Injectable } from '@angular/core';
import { UserState } from './user.state';
import { State } from '@ngxs/store';
import { SignInPageState } from './signIn-page.state';
import { AuthStatusState } from './auth-status.state';


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
