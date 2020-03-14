import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SidenavState } from './sidenav.state';
import { ThemeActions } from '../actions/theme.action';
import SetTheme = ThemeActions.SetTheme;
import { ThemeService } from '../../services/theme.service';
import { Injectable } from '@angular/core';

export interface IAppState{
  theme: string,
}

export const initialAppState: IAppState = {
  theme: "light",
};

@State({
  name: "app",
  defaults: initialAppState,
  children: [SidenavState],
})
@Injectable()
export class AppState {

  @Selector()
  static getTheme(state: IAppState){
    return state.theme;
  }

  constructor(
    private readonly _themeService: ThemeService,
  ) {
  }

  @Action(SetTheme)
  setTheme(ctx: StateContext<IAppState>, action: SetTheme){
    this._themeService.setTheme(action.theme);
    return ctx.patchState({
      theme: action.theme,
    });
  }

}



