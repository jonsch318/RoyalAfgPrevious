export namespace ThemeActions{
  export class SetTheme {
    static readonly type = "[Theme] SetTheme";

    constructor(public theme: string) {
    }
  }
}

