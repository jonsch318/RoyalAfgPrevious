import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { APIURL, CORSENABLED } from 'src/app/constants/connection.constants';
import { ancestorWhere } from 'tslint';
import { IBaseApiDto } from '../../core/Dtos/baseApi.dto';
import { map, switchMap } from 'rxjs/operators';

/**
 * Provides the connection between the server and the client to get information about the
 * currently signed in user.
 */
@Injectable()
export class UserService {

  constructor(private readonly _httpClient: HttpClient) {
  }

  /**
   * Gets information about the currently signed in user from the backend.
   */
  getUser(): Observable<IUser>{
    return this.checkAuthState().pipe(switchMap(val => {
      if(val.data.result){
        return this._httpClient.get<IUser>(`${APIURL}/account/getUser`, {
          withCredentials: CORSENABLED,
        });
      }
      else{
        return of(undefined);
      }
    }));

    return this._httpClient.get<IUser>(`${APIURL}/account/getUser`, {
      withCredentials: CORSENABLED,
    });
  }

  checkAuthState(): Observable<IBaseApiDto>{
    return this._httpClient.get<IBaseApiDto>(`${APIURL}/account/verifyAuth`, {
      withCredentials: CORSENABLED,
    });
  }
}
