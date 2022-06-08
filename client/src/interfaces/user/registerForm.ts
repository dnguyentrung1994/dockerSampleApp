export interface RegisterInterface {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  adminAuth?: string | undefined;
}
