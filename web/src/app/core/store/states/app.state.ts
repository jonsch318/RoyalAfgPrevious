import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SidenavState } from './sidenav.state';
import { ThemeService } from '../../services/theme.service';
import { Injectable } from '@angular/core';
import { ThemeActions } from "../actions/theme.action";
import SetTheme = ThemeActions.SetTheme;

/**
 * The interface for the app (theme) state
 */
export interface IAppState{
  theme: string;
}

/**
 * The initial value of the app (theme) state
 */
export const initialAppState: IAppState = {
  theme: "light",
};

/**
 * The state which stores the current theme
 * Composed of the Sidenav State.
 */
@State({
  name: "app",
  defaults: initialAppState,
  children: [SidenavState],
})
@Injectable()
export class AppState {

  /**
   * Selects the current theme from the state
   * @param state The state from which the theme is selected.
   */
  @Selector()
  static getTheme(state: IAppState){
    return state.theme;
  }

  constructor(
    private readonly _themeService: ThemeService,
  ) {
  }

  /**
   * Sets the theme to a new value
   * @param ctx The state context
   * @param action Holds the new value for which the theme should be set.
   */
  @Action(SetTheme)
  setTheme(ctx: StateContext<IAppState>, action: SetTheme){
    this._themeService.setTheme(action.theme);
    return ctx.patchState({
      theme: action.theme,
    });
  }

}



