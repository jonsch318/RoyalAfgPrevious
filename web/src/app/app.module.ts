import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AccountModule } from './account/account.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/containers/app/app.component';
import { MaterialModule } from './material';
import { appStates } from './core/store';
import { ThemeService } from './core/services/theme.service';

// @ts-ignore
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
        developmentMode: !environment.production,
      }),
    //NgxsLoggerPluginModule.forRoot(),
    MatDialogModule,
    AppRoutingModule,
    AccountModule.forRoot(),
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
