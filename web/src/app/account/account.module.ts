import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './store/states/user.state';
import { SignInComponent } from './components/signIn/signIn.component';
import { UserService } from './services/user.service';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AuthState } from './store/states/auth.state';
import { AccountRoutingModule } from './account-routing.module';
import { SignoutDialogComponent } from './dialogs/signout/signout.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthStatusState } from './store/states/auth-status.state';
import { AuthActions } from './store/actions/auth.action';
import SignInSuccess = AuthActions.SignInSuccess;
import { SignInPageState } from './store/states/signIn-page.state';
import { MaterialModule } from '../material';
import SignOutSuccess = AuthActions.SignOutSuccess;
import { SignOutState } from './store/states/signOut.state';

export const COMPONENTS = [
  SignInComponent,
  SignoutDialogComponent,

];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    AccountRoutingModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AccountModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccountRootModule,
      providers: [
        UserService,
        AuthService,
      ]
    }
  }
}

@NgModule({
  imports: [
    AccountModule,
    NgxsModule.forFeature([
      AuthState,
      UserState,
      AuthStatusState,
      SignInPageState,
      SignOutState,
    ])
  ]
})
export class AccountRootModule {

}
