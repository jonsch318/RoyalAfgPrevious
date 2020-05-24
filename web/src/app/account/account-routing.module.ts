import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/signIn/signIn.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  {
    // Configures the route for the sign in page.
    path: "signin",
    component: SignInComponent,
  },{
    // Configures the route for the register page.
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
