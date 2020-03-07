import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from '../../../services/auth/auth.service';
import { LoginDto } from '../../../../../../server/src/auth/dtos/login-dto';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../store/state/app.state';
import { Login } from '../../../store/actions/auth.action';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit{
  formGroup: FormGroup;

  constructor(
    private titleService: Title,
    private readonly _store: Store<IAppState>,
    ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Royal Afg - Login");

    this.formInit();
  }

  private formInit(){
    this.formGroup = new FormGroup({
      "username": new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      "password": new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    })
  }

  submit(){
    console.log("Submit called");
    if(this.formGroup.valid){
      const value: LoginDto = this.formGroup.value;
      this._store.dispatch(new Login(value));
    }
  }

}
