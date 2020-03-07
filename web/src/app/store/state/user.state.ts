import { IUser } from '../../interfaces/user';

/**
 * The state of the user. If it is loggedIn and if the details of the current user.
 */
export interface IUserState {
  user: IUser;
  isLoggedIn: boolean;
}

/**
 * The initial state of the user state. Obviously the application is not signed in by default.
 */
export const initialUserState: IUserState = {
  user: undefined,
  isLoggedIn: false,
};
