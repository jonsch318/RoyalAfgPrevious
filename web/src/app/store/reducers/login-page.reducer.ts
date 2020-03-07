import { ILoginPageState, initialLoginPageState } from '../state/login-page.state';
import { AuthActions, AuthActionsTypes } from '../actions/auth.action';

export const loginPageReducer = (
    state = initialLoginPageState,
   action: AuthActions
  ): ILoginPageState => {
  switch (action.type) {
    case AuthActionsTypes.Login: {
      return {
        ...state,
        pending: true,
      };
    }
    case AuthActionsTypes.LoginSuccess: {
      return initialLoginPageState;
    }
    case AuthActionsTypes.LoginFailed: {
      return {
        ...state,
        pending: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
