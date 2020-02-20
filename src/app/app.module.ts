import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserPortalModule} from './Pages/UserPortal/user-portal.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSliderModule} from "@angular/material/slider";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {MatSidenavModule} from "@angular/material/sidenav";

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
        UserPortalModule,
        AppRoutingModule,
        FontAwesomeModule,
        MatSidenavModule,
    ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
