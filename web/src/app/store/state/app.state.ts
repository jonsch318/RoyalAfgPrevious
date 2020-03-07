import { RouterReducerState } from '@ngrx/router-store';
import { initialUserState, IUserState } from './user.state';
import { ILoginPageState, initialLoginPageState } from './login-page.state';

export interface IAppState {
  router?: RouterReducerState;
  user: IUserState;
  loginPage: ILoginPageState,
}

export const initialAppState: IAppState = {
  user: initialUserState,
  loginPage: initialLoginPageState,
};

/**
 * Get's the initial state of the application.
 * @returns The default/initial state of the application.
 */
export function getInitialState(): IAppState {
  return initialAppState
}
