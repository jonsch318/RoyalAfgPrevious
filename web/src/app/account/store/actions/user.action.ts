import { IUser } from '../../interfaces/user.interface';

export namespace UserActions {
  export class GetUser {
    static readonly type = "[User API] GetUser";
  }

  export class GetUserSuccess {
    static readonly type = "[User API] GetUserSuccess";

    constructor(public user: IUser) {
    }
  }

  export class GetUserFailed {
    static readonly type = "[User API] GetUserFailed";

    constructor(public error: any) {
    }
  }

  export class SetUser {
    static readonly type = "[User API] SetUser";

    constructor(public user: IUser) {
    }
  }
}
