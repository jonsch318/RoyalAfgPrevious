export namespace SignOutActions {

  export class SignOut {
    static readonly type = "[Auth API] UserSignOut";
  }

  export class SignOutConfirmed {
    static readonly type = "[Auth API] UserSignOutConfirmed";
  }

  export class SignOutDeclined {
    static readonly type = "[Auth API] UserSignOutDeclined";
  }

}
