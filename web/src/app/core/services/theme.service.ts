import { Injectable } from '@angular/core';

/**
 * The currently supported Themes.
 */
export enum Themes {
  light = "light",
  dark = "dark",
}

/**
 * A Service which provides method to change the theme of the application
 */
@Injectable()
export class ThemeService {

  /**
   * Sets the theme of the application by changing the body theme class.
   * @param theme The theme which should be applied.
   */
  setTheme(theme: string): any{
    console.log("Set Theme: " + theme);
    const themeRegex = new RegExp(/([\s].*-theme)/);
    document.body.className = document.body.className.replace(themeRegex, ` ${theme}-theme`);
  }
}
