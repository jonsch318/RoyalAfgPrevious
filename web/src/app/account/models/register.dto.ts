/**
 * The Data transfer object of the registration process. This is the same as the data transfer object of the server.
 */
export class RegisterDto {
  username: string;
  password: string;
  fullname: string;
  birthdate: number;
}
