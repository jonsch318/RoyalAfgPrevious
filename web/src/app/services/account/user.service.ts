import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { IUser } from '../../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: IUser;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _store: Store<IAppState>) {
    this._store.pipe(select(store => store.user)).subscribe(value => {
      console.log("user: " + value.user.username)
      this._user = value.user;
    });

  }

  public getUser(): Observable<IUser>{
    if(!this._user.username){
      console.log("The username was null");
      throw new Error("The username was null");
    }
    return this.getUserByUsername(this._user.username);
  }

  private getUserById(id: string): Observable<IUser>{
    return this.httpClient.get<IUser>("http://localhost:3000/api/account/byId", {});
  }


  private getUserByUsername(username: string): Observable<IUser>{
    return this.httpClient.get<IUser>("http://localhost:3000/api/account/byUsername", {});
  }

}
