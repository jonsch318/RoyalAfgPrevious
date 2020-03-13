import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Select, Store } from '@ngxs/store';
import { IUserState, UserState } from '../../../../account/store/states/user.state';
import { Observable } from 'rxjs';
import { IUser } from '../../../../account/interfaces/user.interface';
import { AuthActions } from '../../../../account/store/actions/auth.action';
import SignOut = AuthActions.SignOut;

@Component({
  selector: 'app-nav-identity-menu',
  templateUrl: './identity.pop.component.html',
  styleUrls: ['./identity.pop.component.scss']
})
export class IdentityPopComponent implements OnInit, AfterContentInit {


  @ViewChild(MatMenu)
  private readonly menu: MatMenu;

  @Select(UserState.getUser)
  user$: Observable<IUser>;

  constructor(
    private readonly _store: Store
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log(this.menu);
  }

  signOut(){
    this._store.dispatch(new SignOut());
  }

}
