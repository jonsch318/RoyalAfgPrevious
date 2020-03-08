import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ScannedActionsSubject, Store } from '@ngrx/store';
import { IAppState } from './store/state/app.state';
import { AuthActionsTypes, LoadUser, LoadUserFailed } from './store/actions/auth.action';
import { filter } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  error = "";

  constructor(
    private readonly titleService: Title,
    private readonly _store: Store<IAppState>,
    private readonly _actions$: ScannedActionsSubject,
    ) {
    this._actions$.pipe(ofType<LoadUserFailed>(AuthActionsTypes.LoadUserFailed)).subscribe(val => {
      this.error = val.payload.massage;
    })
  }

  ngOnInit(): void {
    this.titleService.setTitle("New Title heyho");
    this._store.dispatch(new LoadUser())
  }



}
