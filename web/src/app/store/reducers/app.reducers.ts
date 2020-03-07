import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { routerReducer } from '@ngrx/router-store';
import { userReducer } from './user.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  user: userReducer
};
