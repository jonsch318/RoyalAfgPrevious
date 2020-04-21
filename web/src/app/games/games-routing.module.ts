import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectComponent } from './containers/select/select.component';
import { PlayComponent } from './containers/play/play.component';

export const routes: Routes = [
  {
    path: "games/play",
    component: PlayComponent
  },
  {
    path: "games",
    redirectTo: "/games/select"
  },
  {
    path: "games/select",
    component: SelectComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GamesRoutingModule {

}
