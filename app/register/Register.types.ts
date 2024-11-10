export type RegisterBody = {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  surname: string;
  termsAndConditions: boolean;
};

export type RegisterResponse = {
  message: string;
};
