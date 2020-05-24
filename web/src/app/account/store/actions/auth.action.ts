/**
 * Exports Action for the Authentication Process. This includes Register, Sign in and Sign out
 */
export namespace AuthActions {

  /**
   * The action for when the sign in process was successful.
   */
  export class SignInSuccess {
    static readonly type = "[Auth API] UserSignInSuccess";
  }

  /**
   * The action for when the registration process was successful.
   */
  export class RegisterSuccess {
    static readonly type = "[Auth API] UserRegisterSuccess";
  }

  /**
   * The action for when the registration process was unsuccessful due to an error.
   */
  export class RegisterFailed {
    /**
     * Identifier of the Action
     */
    static readonly type = "[Auth API] UserRegisterFailed";

    /**
     * The default constructor
     * @param error The error why the registration process was interrupted.
     */
    constructor(public error: any) {
    }
  }

  /**
   * The action for when the sign in process was unsuccessful due to an error.
   */
  export class SignInFailed {
    static readonly type = "[Auth API] UserSignInFailed";

    /**
     * The default constructor
     * @param error The error which interrupted the process.
     */
    constructor(public error: any) {
    }
  }

  /**
   * The action for when the sign out process was successful.
   */
  export class SignOutSuccess {
    static readonly type = "[Auth API] UserSignOutSuccess";
  }

  /**
   * The action for when the sign out process was unsuccessful due to an error.
   */
  export class SignOutFailed {
    static readonly type = "[Auth API] UserSignOutFailed";

    /**
     * The default constructor
     * @param error The error which caused the interruption of the prcoess.
     */
    constructor(public error: any) {
    }
  }

  /**
   * The sign in was verified and the user object can now be used.
   */
  export class SignInVerified {
    static readonly type = "[Auth API] SignInVerified";
  }

}
