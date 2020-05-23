import { RegisterDto } from '../../models/register.dto';

/**
 * Actions which change the state of the Register Page State.
 */
export namespace RegisterPageActions {
  /**
   * Start a registration process.
   */
  export class Register{
    static readonly type = "[SignInPage] UserSignIn";

    /**
     * The default constructor
     * @param registerDto The data transfer object which is needed to register the new user and which is send to the server.
     */
    constructor(public registerDto: RegisterDto) {
    }
  }
}
