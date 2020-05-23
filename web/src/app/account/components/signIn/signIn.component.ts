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

  /**
   * This selects or more observes the current status of the AuthStatusState. In short is the user already signed in?
   */
  @Select(AuthStatusState.getSignedIn)
  isSignedIn$: Observable<boolean>;

  /**
   * This selects or more observes the current status of the SignInPageState.
   * In short is the sign in page already processing an attempt, or does are there any error?
   */
  @Select(SignInPageState.getSignInError)
  signInState$: Observable<any>;


  constructor(
    private _titleService: Title,
    // Include the store and therefore the state of the application.
    private _store: Store
    ) {
  }

  ngOnInit(): void {
    // Changes the title displayed by the browser.
    this._titleService.setTitle("Royal Afg - Login");
    this.formInit();
  }

  /**
   * Initializes the form of the SignInPage
   */
  private formInit(){
    // username is required and has a maximum length of 100 characters.
    const username = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
    // password is required and has a maximum length of 100 characters.
    const password = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
    // The formGroup is used to check for any errors during Validation and to get the value of the entire form
    this.formGroup = new FormGroup({
      username, password
    });
  }

  submit(){
    // Is the input given by the user valid to the above Validators?
    if(this.formGroup.valid){
      // Assign the SignIn Data Transfer Object.
      const value: SignInDto = this.formGroup.value;
      this._store.dispatch(new SignIn(value));
    }
  }

}
