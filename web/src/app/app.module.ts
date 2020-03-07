import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserPortalModule} from './Pages/UserPortal/user-portal.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import {MatSidenavModule} from "@angular/material/sidenav";
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effect';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        HttpClientXsrfModule.withOptions({
            cookieName: "XSRF-TOKEN",
            headerName: "X-CSRF-TOKEN",
        }),
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([
          UserEffects
        ]),
        StoreRouterConnectingModule.forRoot({stateKey: "router"}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        UserPortalModule,
        AppRoutingModule,
        FontAwesomeModule,
        MatSidenavModule,
    ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
