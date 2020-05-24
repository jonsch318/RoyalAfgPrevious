import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AccountModule } from './account/account.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers/app/app.component';
import { MaterialModule } from './material';
import { appStates } from './core/store';
import { GamesModule } from './games/games.module';
import { StaticModule } from './static/static.module';

// Main Application Module. Here we include all the other Modules and external Dependencies.
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    CoreModule.forRoot(),
    MaterialModule,
    NgxsModule.forRoot(
      [
        ...appStates
      ], {
        // development mode enables features, like easy state manipulation from the console.
        developmentMode: !environment.production,
      }),
    MatDialogModule,
    AppRoutingModule,
    AccountModule.forRoot(),
    GamesModule,
    StaticModule,
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
