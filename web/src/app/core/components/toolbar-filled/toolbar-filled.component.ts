import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SidenavActions } from '../../store/actions/sidenav.action';
import CloseSidenav = SidenavActions.CloseSidenav;
import OpenSidenav = SidenavActions.OpenSidenav;

@Component({
  selector: 'core-toolbar-filled',
  templateUrl: './toolbar-filled.component.html',
  styleUrls: ['./toolbar-filled.component.scss']
})
export class ToolbarFilledComponent implements OnInit {

  constructor(
    private readonly _store: Store
  ) { }

  ngOnInit(): void {
  }

  closeSidenav(){this._store.dispatch(new CloseSidenav());}
  openSidenav(){this._store.dispatch(new OpenSidenav());}

}
