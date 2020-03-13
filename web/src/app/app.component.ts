import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import { Store } from '@ngxs/store';
import { UserActions } from './account/store/actions/user.action';
import GetUser = UserActions.GetUser;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  error = "";

  constructor(
    private readonly titleService: Title,
    private readonly _store: Store
    ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("New Title heyho");
    this._store.dispatch(new GetUser());
  }



}
