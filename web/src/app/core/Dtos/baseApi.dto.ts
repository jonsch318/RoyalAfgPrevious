/**
 * A common base for any server api interaction. Holds errors and data
 */
export interface IBaseApiDto {
  error: string;
  data: any;
}
