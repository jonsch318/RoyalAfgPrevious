import { Action, Selector, State } from '@ngxs/store';
import { Injectable } from '@angular/core';

export interface IAppState {
  theme?: string,
}

export const initialAppState: IAppState = {
  theme: "light",
};

@State<IAppState>({
  name: "app",
  defaults: initialAppState,
})
@Injectable()
export class AppState {

  @Selector()
  static getTheme(state: IAppState){
    return state.theme;
  }

}
