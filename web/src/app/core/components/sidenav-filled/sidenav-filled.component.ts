import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SidenavActions } from '../../store/actions/sidenav.action';
import { SidenavState } from '../../store/states/sidenav.state';
import { ThemeActions } from '../../store/actions/theme.action';
import { Observable } from 'rxjs';
import SetTheme = ThemeActions.SetTheme;
import OpenSidenav = SidenavActions.OpenSidenav;
import CloseSidenav = SidenavActions.CloseSidenav;

@Component({
  selector: 'core-sidenav-filled',
  templateUrl: './sidenav-filled.component.html',
  styleUrls: ['./sidenav-filled.component.scss']
})
export class SidenavFilledComponent implements OnInit {

  @Select(SidenavState.getOpen)
  sidenavOpen$: Observable<boolean>;

  constructor(
    private readonly _store: Store
  ) { }

  ngOnInit(): void {
  }

  changeTheme(theme: string){
    this._store.dispatch(new SetTheme(theme));
  }

  closeSidenav(){
    this._store.dispatch(new CloseSidenav());
  }

  openSidenav(){
    this._store.dispatch(new OpenSidenav());
  }

}
