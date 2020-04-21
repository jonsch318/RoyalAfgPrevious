import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { SignInDto } from '../../models/signInDto';
import { SignInPageActions } from '../../store/actions/signIn-page.action';
import SignIn = SignInPageActions.SignIn;
import { Observable } from 'rxjs';
import { AuthStatusState } from '../../store/states/auth-status.state';
import { SignInPageState } from '../../store/states/signIn-page.state';


@Component({
  selector: "app-login",
  templateUrl: "./signIn.component.html",
  styleUrls: ["./signIn.component.scss"],
})
export class SignInComponent implements OnInit {
  formGroup: FormGroup;

  @Select(AuthStatusState.getSignedIn)
  isSignedIn$: Observable<boolean>;

  @Select(SignInPageState.getSignInError)
  signInState$: Observable<any>;

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
    const username = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
    const password = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
    this.formGroup = new FormGroup({
      username, password
    });
  }

  submit(){
    if(this.formGroup.valid){
      const value: SignInDto = this.formGroup.value;
      this._store.dispatch(new SignIn(value));
    }
  }

}
