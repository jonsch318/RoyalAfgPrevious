import { initialUserState, IUserState } from '../state/user.state';
import { AuthActions, AuthActionsTypes } from '../actions/auth.action';

export const userReducer = (
  state=  initialUserState,
  action: AuthActions
): IUserState => {

  switch (action.type) {
    case AuthActionsTypes.LoginSuccess: {
      console.log("State updated: " + action.payload.username);
      return {
        ...state,
        user: action.payload
      };
    }

    case AuthActionsTypes.LoadUserSuccess: {
      console.log("Loaded User successfully: " + action.payload.username);
      return {
        ...state,
        user: action.payload,
      }
    }

    case AuthActionsTypes.SignOutSuccess: {
      console.log("Signed out User successfully");
      return {
        ...state,
        user: null,
      }
    }


    default: {
      return state
    }
  }

};

