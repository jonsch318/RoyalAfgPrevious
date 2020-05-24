import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SidenavActions } from '../actions/sidenav.action';
import OpenSidenav = SidenavActions.OpenSidenav;
import CloseSidenav = SidenavActions.CloseSidenav;
import ToggleSidenav = SidenavActions.ToggleSidenav;

/**
 * The interface for the Sidenav state.
 */
export interface ISidenavState {
  open: boolean;
}

/**
 * The initial value for the Sidenav state.
 */
export const initialSideNavState: ISidenavState = {
  open: false,
};

/**
 * The state which stores information about the current sidenav status.
 */
@State({
  name: "sidenav",
  defaults: initialSideNavState,
})
@Injectable()
export class SidenavState {

  /**
   * Selects the current status of the sidenav from the state.
   * @param state The state from which teh current sidenav status is selected.
   */
  @Selector()
  static getOpen(state: ISidenavState) {
    return state.open;
  }

  /**
   * Changes the Sidenav state to open.
   * @param patchState A function to change the state
   * @param action The action that is processed
   */
  @Action(OpenSidenav)
  openSidenav({patchState}: StateContext<ISidenavState>, action: OpenSidenav){
    patchState({
      open: true
    });
  }

  /**
   * Changes the Sidenav state to close.
   * @param patchState A function to change the state
   * @param action The action that is processed
   */
  @Action(CloseSidenav)
  closeSidenav({patchState}: StateContext<ISidenavState>, action: CloseSidenav){
    patchState({
      open: false
    });
  }

  /**
   * Inverts the current Sidenav state.
   * @param patchState A function to change the state
   * @param getState A function to get the current state
   * @param action The action that is processed
   */
  @Action(ToggleSidenav)
  toggleSidenav({getState, patchState}: StateContext<ISidenavState>, action: ToggleSidenav){
    const state = getState();
    return patchState({
      open: !state.open
    });
  }

}
