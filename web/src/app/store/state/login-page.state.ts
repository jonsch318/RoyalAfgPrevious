export interface ILoginPageState {
  pending: boolean,
  error: string | null,
}

export const initialLoginPageState: ILoginPageState = {
  pending: false,
  error: null,
};
