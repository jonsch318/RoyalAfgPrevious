import { Injectable } from '@angular/core';
import { UserState } from './user.state';
import { State } from '@ngxs/store';
import { SignInPageState } from './signIn-page.state';
import { AuthStatusState } from './auth-status.state';

/**
 * Combines the States of the different Processes into this global Authentication State.
 */
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
