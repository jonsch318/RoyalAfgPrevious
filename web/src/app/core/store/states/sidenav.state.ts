import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SidenavActions } from '../actions/sidenav.action';
import OpenSidenav = SidenavActions.OpenSidenav;
import CloseSidenav = SidenavActions.CloseSidenav;
import ToggleSidenav = SidenavActions.ToggleSidenav;

export interface ISidenavState {
  open: boolean,
}

export const initialSideNavState: ISidenavState = {
  open: false,
};

@State({
  name: "sidenav",
  defaults: initialSideNavState,
})
export class SidenavState {
  @Selector()
  static getOpen(state: ISidenavState){
    return state.open;
  }

  @Action(OpenSidenav)
  openSidenav({patchState}: StateContext<ISidenavState>, action: OpenSidenav){
    patchState({
      open: true
    })
  }

  @Action(CloseSidenav)
  closeSidenav({patchState}: StateContext<ISidenavState>, action: CloseSidenav){
    patchState({
      open: false
    })
  }

  @Action(ToggleSidenav)
  toggleSidenav({getState, patchState}: StateContext<ISidenavState>, action: ToggleSidenav){
    const state = getState();
    return patchState({
      open: !state.open
    });
  }

}
