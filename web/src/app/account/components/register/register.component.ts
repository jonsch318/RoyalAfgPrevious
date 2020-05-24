import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RegisterPageActions } from '../../store/actions/register-page.action';
import Register = RegisterPageActions.Register;
import { RegisterDto } from '../../models/register.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchValidator } from '../../validators/match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private readonly _store: Store,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(){
    const username = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
    const email = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
    const password = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
    const confirmPassword = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
    const birthdate = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
    const fullname = new FormControl(null, [Validators.required, Validators.maxLength(100)]);

    this.formGroup = this._formBuilder.group({
      username, email, password, confirmPassword, birthdate, fullname
    }, {
      validators: MatchValidator("password", "confirmPassword")
    });
  }

  submit(){
    if(this.formGroup.valid){
      const val: RegisterDto = this.formGroup.value;
      console.log("registering :  " + val );
      this._store.dispatch(new Register(val));
    }
  }

}
