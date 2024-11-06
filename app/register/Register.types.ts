export type RegisterBody = {
  email: string;
  password: string;
  repeatedPassword: string;
  name: string;
  surname: string;
  termsAndConditions: boolean;
};

export type RegisterResponse = {
  message: string;
};
