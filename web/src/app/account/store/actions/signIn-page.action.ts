import { SignInDto } from '../../models/signInDto';

export namespace SignInPageActions {
  export class SignIn{
    static readonly type = "[SignInPage] UserSignIn";
    
    constructor(public signInDto: SignInDto) {
    }
  }
}
