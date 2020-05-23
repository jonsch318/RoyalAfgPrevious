/**
 * Actions which change the Theme state.
 */
export namespace ThemeActions{

  /**
   * Action which sets the Theme to a new value.
   */
  export class SetTheme {
    static readonly type = "[Theme] SetTheme";

    /**
     * The default constructor
     * @param theme The new value of the theme.
     */
    constructor(public theme: string) {
    }
  }
}

