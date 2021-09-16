export type AppUser = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
};

export interface SimpleUser {
  email: string;
  password: string;
}

export interface RegisterFormData extends SimpleUser {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
