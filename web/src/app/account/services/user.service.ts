import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { accountUrl } from './auth.service';

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
    return this._httpClient.get<IUser>(`${accountUrl}/getUser`);
  }

}
