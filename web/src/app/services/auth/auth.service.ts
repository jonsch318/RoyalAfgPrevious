import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { LoginDto } from '../../../../../server/src/auth/dtos/login-dto';
import { IUser } from '../../interfaces/user';
import { SetUser } from '../../store/actions/user.actions';

const AuthUrl = "http://localhost:3000/account";

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(
    private readonly _store: Store<IAppState>,
    private readonly _httpClient: HttpClient,
  ) {

  }

  public signin(dto: LoginDto): Observable<IUser>{
    console.log(`Sign in started with username ${dto.username} and password ${dto.password}`);
    return this._httpClient.post<IUser>("http://localhost:3000/account/signin", {
      username: dto.username,
      password: dto.password,
    })
  }


}
