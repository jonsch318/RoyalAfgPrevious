import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { accountUrl } from './auth.service';

@Injectable()
export class UserService {

  constructor(private readonly _httpClient: HttpClient) {
  }

  getUser(): Observable<IUser>{
    return this._httpClient.get<IUser>(`${accountUrl}/getUser`)
  }

}
