export type RegisterPayload = {
    email: string;
    name: string;
    surname: string;
    password: string;
    passwordConfirm: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type UpdatePasswordPayload = {
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
};

export type AuthResponse = {
    Token: string;
};
