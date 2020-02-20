import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserDetails} from "../interfaces/account";
import {User} from "../models/user";
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user$ = new BehaviorSubject<User>(null);

  public user$ = this._user$.asObservable();

  public isSignedIn: Observable<boolean>;

  private token : string;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
    this.isSignedIn = this.user$.pipe(map(x => x === null));
    this.getUser();
  }

  public getUser(): void{
    if(this.isLoggedIn()){
      let headers = {
        Authorization: "Bearer: " + this.getToken()
      };
      this.httpClient.get<User>("http://localhost:5000/api/account/", {headers}).subscribe((val) => {
        this._user$.next(val);
      });
    }
    this._user$.next(null);
  }

  public logout(): void{
    this.token = "";
    localStorage.removeItem("mean-token");
    this.router.navigateByUrl("/").then().catch();
  }

  private getUserDetails(): UserDetails{
    let token = this.getToken();
    if(token){
      let payload = token.split(".")[0];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private saveToken(token: string): void {
    localStorage.setItem("mean-token", token);
    this.token = token;
  }

  private getToken(): string{
    if(!this.token)
      this.token = localStorage.getItem("mean-token");
    return this.token;
  }
}
