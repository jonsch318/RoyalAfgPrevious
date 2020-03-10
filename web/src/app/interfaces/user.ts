/**
 * The interface for a user. Password is not included because it is only needed on login and register, where custom data transfer objects (dto's) are a better option
 */
export interface IUser {
  id: string,
  username: string,
  fullname: string,
  birthdate: Date,
}
