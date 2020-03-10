import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserPortalComponent} from './user-portal/user-portal.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {path: "myaccount", component: UserPortalComponent},
  {path: "login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPortalRoutingModule {
}
