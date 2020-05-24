/**
 * Changes the theme of the Sidenav State
 */
export namespace SidenavActions{
  /**
   * Indicates that the Sidenav state should open
   */
  export class OpenSidenav {
    static readonly type = "[Sidenav] OpenSidenav";
  }
  /**
   * Indicates that the Sidenav state should close
   */
  export class CloseSidenav {
    static readonly type = "[Sidenav] CloseSidenav";
  }
  /**
   * Indicates that the Sidenav state should toggle
   */
  export class ToggleSidenav {
    static readonly type = "[Sidenav] ToggleSidenav";
  }
}
