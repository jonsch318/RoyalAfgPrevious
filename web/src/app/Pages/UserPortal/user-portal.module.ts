import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';

import {UserPortalComponent} from './user-portal/user-portal.component';
import {UserPortalRoutingModule} from './user-portal-routing.module';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatStepperModule} from "@angular/material/stepper";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    UserPortalRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  declarations: [
    UserPortalComponent,
    LoginComponent
  ]
})
export class UserPortalModule {
}
