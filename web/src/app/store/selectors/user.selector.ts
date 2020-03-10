import { IAppState } from '../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from '../state/user.state';

export const selectUserState = createFeatureSelector<IUserState>("user");

export const selectUser = createSelector(selectUserState, (state: IUserState) => state.user);
export const selectIsLoggedIn = createSelector(selectUser, user => !!user );
