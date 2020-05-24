/**
 * The interface of the user model. It is an interface, but objects can be created which have the same form as this.
 */
export interface IUser {
  id: string;
  username: string;
  fullname: string;
  birthdate: Date;
}
