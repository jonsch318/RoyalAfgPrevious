import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from '../../models/user';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _store: Store<IAppState>) {
  }

  public getUserById(id: string): Observable<User>{
    return this.httpClient.get<User>("http://localhost:3000/api/account/byId", {});
  }


  public getUserByUsername(username: string): Observable<User>{
    return this.httpClient.get<User>("http://localhost:3000/api/account/byUsername", {});
  }

}
