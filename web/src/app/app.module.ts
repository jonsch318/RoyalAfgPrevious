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
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthEffects } from './store/effects/auth.effects';
import { IdentityPopComponent } from './shared/navbar/pops/identity/identity.pop.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SignoutDialogComponent } from './dialogs/signout/signout.dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IdentityPopComponent,
    SignoutDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN',
    }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([
      AuthEffects,
    ]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    UserPortalModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    AccountModule,
  ],
  providers: [
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
