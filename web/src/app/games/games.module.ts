import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';
import { SelectComponent } from './containers/select/select.component';
import { GamesRoutingModule } from './games-routing.module';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { SelectGridItemComponent } from './components/select-grid-item/select-grid-item.component';
import { PlayComponent } from './containers/play/play.component';

export const COMPONENTS = [
  SelectGridItemComponent,
  SelectComponent,
  PlayComponent,
];

@NgModule({
  imports:[
    CommonModule,
    MaterialModule,
    MatGridListModule,
    GamesRoutingModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
/**
 * Includes Select Page and a dummy for playing a game.
 */
export class GamesModule {
  
}
