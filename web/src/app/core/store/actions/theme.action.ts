import { Themes } from '../../services/theme.service';

export namespace ThemeActions{
  export class SetTheme {
    static readonly type = "[Theme] SetTheme";

    constructor(public theme: string) {
    }
  }
}

