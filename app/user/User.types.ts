export type Account = {
  accountNumber: string;
  balance: number;
};

export type Child = {
  childId: string;
  name: string;
  className: string;
};

export type User = {
  email: string;
  name: string;
  surname: string;
  createdAt: string;
  account: Account;
  children: Child[];
};
