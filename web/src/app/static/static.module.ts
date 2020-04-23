import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MaterialModule } from '../material';
import { StaticRoutingModule } from './static.routing.module';
import { IndexComponent } from './pages/index/index.component';
import { GamesModule } from '../games/games.module';

const COMPONENTS = [
  IndexComponent
];

// @ts-ignore
@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MaterialModule,
    StaticRoutingModule,
    GamesModule,
  ],
})
export class StaticModule { }
