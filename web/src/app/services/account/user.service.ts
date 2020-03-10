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

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private _store: Store<IAppState>)
  {
  }

  public getUser(): Observable<IUser>{
    return this.httpClient.get<IUser>("http://localhost:3000/api/account/", {withCredentials: true});
  }

  private getUserById(id: string): Observable<IUser>{
    return this.httpClient.get<IUser>("http://localhost:3000/api/account/byId", {withCredentials: true});
  }


  private getUserByUsername(username: string): Observable<IUser>{
    return this.httpClient.get<IUser>("http://localhost:3000/api/account/byUsername", {});
  }

}
