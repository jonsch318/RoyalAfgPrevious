import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../models/user';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token : string;

  constructor(
    private httpClient: HttpClient,
    private router: Router) {
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

  public logout(): void{
    this.token = "";
    localStorage.removeItem("mean-token");
    this.router.navigateByUrl("/");
  }

}
