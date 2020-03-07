import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly _tokenName = "auth";

  constructor() { }

  public async getToken(): Promise<string>{
    return localStorage.getItem(this._tokenName);
  }

  public async deleteToken(): Promise<string>{
    const token = await this.getToken();
    localStorage.removeItem(this._tokenName);
    return token;
  }

  public async setToken(token: string): Promise<any>{
    localStorage.setItem(this._tokenName, token);
  }

}
