export namespace AuthActions {

  export class SignInSuccess {
    static readonly type = "[Auth API] UserSignInSuccess";
  }

  export class SignInFailed {
    static readonly type = "[Auth API] UserSignInFailed";
    constructor(public error: any) {
    }
  }

  export class SignOutSuccess {
    static readonly type = "[Auth API] UserSignOutSuccess";
  }

  export class SignOutFailed {
    static readonly type = "[Auth API] UserSignOutFailed";

    constructor(public error: any) {
    }
  }

  export class SignInVerified {
    static readonly type = "[Auth API] SignInVerified";
  }

}
