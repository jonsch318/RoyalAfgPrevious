import { Component, OnInit } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Select, Store } from '@ngxs/store';
import { AuthActions } from '../../../account/store/actions/auth.action';
import SignOut = AuthActions.SignOut;
import { Observable } from 'rxjs';
import { AuthStatusState } from '../../../account/store/states/auth-status.state';

@Component({
  selector: 'nav-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit{

  @Select(AuthStatusState.getSignedIn)
  isSignedIn: Observable<boolean>;

  constructor(
    private readonly _store: Store,
  ) {

  }

  ngOnInit(){

  }

  signOut(){
    this._store.dispatch(new SignOut());
  }

}
