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
/**
 * This is a test module for static webpages. This would be the path for the inclusions of the other Projects and Games.
 */
export class StaticModule { }
