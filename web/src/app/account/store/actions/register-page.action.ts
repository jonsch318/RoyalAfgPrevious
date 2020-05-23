import { RegisterDto } from '../../models/register.dto';

export namespace RegisterPageActions {
  export class Register{
    static readonly type = "[SignInPage] UserSignIn";

    constructor(public registerDto: RegisterDto) {
    }
  }
}
