import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { SignInDto } from '../../models/signInDto';
import { SignInPageActions } from '../../store/actions/signIn-page.action';
import SignIn = SignInPageActions.SignIn;
import { UserState } from '../../store/states/user.state';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: "app-login",
  templateUrl: "./signIn.component.html",
  styleUrls: ["./signIn.component.scss"],
})
export class SignInComponent implements OnInit{
  formGroup: FormGroup;

  @Select(UserState.isSignedIn)
  isSignedIn$: Observable<boolean>;

  constructor(
    private _titleService: Title,
    private _store: Store
    ) {
  }

  ngOnInit(): void {
    this._titleService.setTitle("Royal Afg - Login");
    this.formInit();
  }

  private formInit(){
    this.formGroup = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    })
  }

  submit(){
    if(this.formGroup.valid){
      const value: SignInDto = this.formGroup.value;
      this._store.dispatch(new SignIn(value));
    }
  }

}
