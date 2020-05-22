import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/signIn/signIn.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {
    path: "signin",
    component: SignInComponent,
  },{
    path: "register",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {

}
