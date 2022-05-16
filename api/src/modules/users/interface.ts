export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email?: string | undefined;
  address?: string | undefined;
  telephone?: string | undefined;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email?: string | undefined;
  address?: string | undefined;
  telephone?: string | undefined;
}