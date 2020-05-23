import { IUser } from '../../interfaces/user.interface';

/**
 * Actions which change the User State.
 */
export namespace UserActions {
  /**
   * Gets Information about the currently signed in user from the backend.
   */
  export class GetUser {
    static readonly type = "[User API] GetUser";
  }

  /**
   * Indicates that the GetUser Action was successful and the user object is now up to date.
   */
  export class GetUserSuccess {
    static readonly type = "[User API] GetUserSuccess";

    /**
     *  The default constructor
     * @param user The up to date user model. The response from the server.
     */
    constructor(public user: IUser) {
    }
  }

  /**
   * Indicates that the GetUser Action was unsuccessful due to an error.
   */
  export class GetUserFailed {
    static readonly type = "[User API] GetUserFailed";

    /**
     * The default constructor
     * @param error The error which caused the interruption
     */
    constructor(public error: any) {
    }
  }

  /**
   * Action to set the UserState.
   */
  export class SetUser {
    static readonly type = "[User API] SetUser";

    constructor(public user: IUser) {
    }
  }
}
