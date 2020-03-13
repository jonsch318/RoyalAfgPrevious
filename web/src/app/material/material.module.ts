import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';

export const MATERIALMODULES = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatStepperModule,
  MatCheckboxModule,
];

@NgModule({
  imports: MATERIALMODULES,
  exports: MATERIALMODULES,
})
export class MaterialModule {
  
}
