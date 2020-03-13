import { ModuleWithProviders, NgModule } from '@angular/core';

export const COMPONENTS = [

];

@NgModule({

})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [],
    }
  }
}
