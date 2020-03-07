import { EUserActions, UserActions } from '../actions/user.actions';
import { initialUserState, IUserState } from '../state/user.state';

export const userReducer = (
  state=  initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        user: action.payload
      };
    }

    case EUserActions.GetSignedIn: {
      return {
        ...state,
        isLoggedIn: state.user != null,
      }
    }

    case EUserActions.SetUser: {
      console.log("The action was SetUser and " + action.payload.username);
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      }
    }

    default:
    return state;
  }
};

