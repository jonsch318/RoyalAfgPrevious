import { State, StateToken } from '@ngxs/store';

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
export class SignInPageState {

}
