import { RouterReducerState } from '@ngrx/router-store';
import { initialUserState, IUserState } from './user.state';

export interface IAppState {
  router?: RouterReducerState;
  user: IUserState;
}

export const initialAppState: IAppState = {
  user: initialUserState,
};

/**
 * Get's the initial state of the application.
 * @returns The default/initial state of the application.
 */
export function getInitialState(): IAppState {
  return initialAppState
}
