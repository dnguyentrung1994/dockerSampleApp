export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}
