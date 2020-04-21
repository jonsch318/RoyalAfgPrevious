import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { MatListModule } from '@angular/material/list';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AppComponent } from './containers/app/app.component';
import { ThemeService } from './services/theme.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';

export const COMPONENTS = [
  NavItemComponent,
  ToolbarComponent,
  SidenavComponent,
  LayoutComponent,
  AccountMenuComponent,
  AppComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    MatTooltipModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ThemeService,
      ],
    }
  }
}
