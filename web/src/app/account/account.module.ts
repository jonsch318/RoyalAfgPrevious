import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { NgxsModule } from '@ngxs/store';
import { UserState } from './store/states/user.state';
import { SignInComponent } from './components/signIn/signIn.component';



@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([
      UserState
    ])
  ],
  declarations: [
    SignInComponent
  ],
})
export class AccountModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccountModule,
      providers: [
        AuthService,
      ]
    }
  }
}
