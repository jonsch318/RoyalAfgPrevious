import { SignInDto } from '../../models/signInDto';

/**
 * Provides the Actions for the sign in process of the SignInPage.
 */
export namespace SignInPageActions {
  /**
   * Action which start the sign in process.
   */
  export class SignIn{
    static readonly type = "[SignInPage] UserSignIn";

    /**
     * The default constructor
     * @param signInDto The data transfer object which is needed to authenticate the user. This is send to the server
     */
    constructor(public signInDto: SignInDto) {
    }
  }
}
