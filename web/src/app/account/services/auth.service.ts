import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInDto } from '../models/signInDto';
import { RegisterDto } from '../models/register.dto';
import { IBaseApiDto } from '../../core/Dtos/baseApi.dto';


export const accountUrl = "http://localhost:2000/api/account";

/**
 * Provides functionality of the authentication actions.
 */
@Injectable()
export class AuthService {

  constructor(private readonly _httpClient: HttpClient) {
  }

  /**
   * Posts a request to the server which will sign in the user.
   * @param dto The credentials used to sign in the user.
   * @returns The observable of the process.
   */
  public signIn(dto: SignInDto): Observable<any> {
    return this._httpClient.post<IBaseApiDto>(`${accountUrl}/signin`, dto, );
  }

  /**
   * Posts a request to the server which will register a new user.
   * @param dto The data transfer object for the registration
   * @returns The observable of the created user
   */
  public register(dto: RegisterDto): Observable<any> {
    return this._httpClient.post<IBaseApiDto>(`${accountUrl}/register`, dto, );
  }

  /**
   * Posts a request to the server which will sign out the user.
   * @returns The observable of the process.
   */
  public async signOut(){
    console.log("Signing out user...");
    return await this._httpClient.post<{
      message: string,
    }>(`${accountUrl}/signout`,{}).toPromise();
  }
}
