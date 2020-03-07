import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/account/user.service';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { EUserActions, GetUser, GetUserSuccess, SetUser } from '../actions/user.actions';
import { map, switchAll, switchMap, withLatestFrom } from 'rxjs/operators';
import { IUser } from '../../interfaces/user';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {

  @Effect()
  getUser$ = this._actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    withLatestFrom([
      this._store.select(store => store.user.user.username)
    ]),
    switchMap(([action, user])=> {
      return this._userService.getUserByUsername(user)
    }),
    switchMap((user: IUser) => of(new GetUserSuccess(user)))
  );



  constructor(
    private readonly _userService: UserService,
    private readonly _actions$: Actions,
    private readonly _store: Store<IAppState>
  ) {
  }

}
