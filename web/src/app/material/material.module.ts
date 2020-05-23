import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// A Module for common Material Modules in the components.

export const MATERIALMODULES = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatStepperModule,
  MatCheckboxModule,
  MatListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTooltipModule,
  MatSnackBarModule,
];

@NgModule({
  imports: MATERIALMODULES,
  exports: MATERIALMODULES,
})
export class MaterialModule {
  
}
