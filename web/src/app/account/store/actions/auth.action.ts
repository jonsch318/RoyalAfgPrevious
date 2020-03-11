export namespace AuthActions {

  export class SignInSuccess {
    static readonly type = "[Auth API] UserSignInSuccess";
  }

  export class SignInFailed {
    static readonly type = "[Auth API] UserSignInFailed";
    constructor(public error: any) {
    }
  }

  export class SignOut {
    static readonly type = "[Auth API] UserSignOut";
  }

  export class SignOutConfirmed {
    static readonly type = "[Auth API] UserSignOutConfirmed";
  }

  export class SignOutDeclined {
    static readonly type = "[Auth API] UserSignOutDeclined";
  }

  export class SignOutSuccess {
    static readonly type = "[Auth API] UserSignOutSuccess";
  }

  export class SignOutFailed {
    static readonly type = "[Auth API] UserSignOutFailed";

    constructor(public error: any) {
    }
  }
}
