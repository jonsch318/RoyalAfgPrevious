import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { APIURL, CORSENABLED } from 'src/app/constants/connection.constants';

@Injectable()
export class UserService {

  constructor(private readonly _httpClient: HttpClient) {
  }

  getUser(): Observable<IUser>{
    return this._httpClient.get<IUser>(`${APIURL}/account/getUser`, {
      withCredentials: CORSENABLED,
    });
  }

}
