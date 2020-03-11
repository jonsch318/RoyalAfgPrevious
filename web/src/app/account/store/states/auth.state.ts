import { Action, State, StateContext } from '@ngxs/store';
import { SignInPageState } from './signIn-page.state';
import { AuthStatusState } from './auth-status.state';
import { IUserState } from './user.state';
import { IUser } from '../../interfaces/user.interface';


@State({
  name: "auth",
  children: [
    SignInPageState,
    AuthStatusState
  ]
})
export class AuthState {



}
