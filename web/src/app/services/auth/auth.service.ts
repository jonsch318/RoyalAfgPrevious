import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../../../server/src/user/interfaces/user';

const AuthUrl = "http://localhost:3000/account";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private _user$ = new BehaviorSubject(null);

  public isLoggedIn$: Observable<boolean>;

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _tokenService: TokenService,
  ) {
    this.isLoggedIn$ = this._user$.pipe(map((val) => {
      return !val;
    }));
  }

  public async signout(): Promise<any>{

    const header = new HttpHeaders({
      Authorization: await this._tokenService.deleteToken()
    });

    this._httpClient.post(AuthUrl + "/signout", {header});
  }

  public async signin(username: string, password: string): Promise<User>{
    await this._httpClient.post<any>(`${AuthUrl}/signin`, {username, password})
      .pipe(map((val) => {
        this._tokenService.setToken(val.accessToken);

      }))
  }

  public async register(user: User): Promise<User>{
    this._httpClient.post<User>(`${AuthUrl}/register`, {user})
      .subscribe((val) => {

    })
  }

}
