export interface IRegisterUser {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email?: string | undefined;
  address?: string | undefined;
  telephone?: string | undefined;
}
