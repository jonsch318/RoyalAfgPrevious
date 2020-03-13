import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { IdentityPopComponent } from './shared/navbar/pops/identity/identity.pop.component';
import { AccountModule } from './account/account.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppState } from './store/states/app.state';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IdentityPopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    NgxsModule.forRoot(
      [
        AppState,
      ], {
        developmentMode: !environment.production,
      }),
    NgxsLoggerPluginModule.forRoot(),
    MatMenuModule,
    AccountModule.forRoot(),
    MatButtonModule,
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
