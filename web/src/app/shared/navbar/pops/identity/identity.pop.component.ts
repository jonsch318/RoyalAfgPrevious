import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { IAppState } from '../../../../store/state/app.state';
import { select, Store } from '@ngrx/store';
import { SignOut } from '../../../../store/actions/auth.action';
import { selectUser } from '../../../../store/selectors/user.selector';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'nav-identity-menu',
  templateUrl: './identity.pop.component.html',
  styleUrls: ['./identity.pop.component.scss']
})
export class IdentityPopComponent implements OnInit, AfterContentInit {

  user$ = this._store.pipe(select(selectUser));

  @ViewChild(MatMenu)
  private readonly menu: MatMenu;

  constructor(
    private readonly _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log(this.menu);
  }

  signout(){
    this._store.dispatch(new SignOut())
  }

}
