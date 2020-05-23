import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { IndexComponent } from './static/pages/index/index.component';

// All the routes are configured in the individual Modules, like Auth.

export const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
