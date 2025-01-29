export type Account = {
  accountNumber: string;
  balance: number;
};

export type Child = {
  childId: string;
  name: string;
  className: string;
  schoolName: string;
};

export type User = {
  email: string;
  name: string;
  surname: string;
  createdAt: string;
  account: Account;
  children: Child[];
};

export type ClassDetails = {
  classId: string;
  name: string;
  schoolName: string;
  isTreasurer: boolean;
  treasurer: {
    email: string;
    name: string;
    surname: string;
  };
};

export type FundraiseDetails = {
  title: string;
  description: string;
  imageIndex: number;
  goalAmount: number;
  raisedAmount: number;
  totalSupporters: number;
  startDate: string;
  endDate: string;
  accountNumber: string;
  classId: string;
  className: string;
  schoolName: string;
  isTreasurer: boolean;
  fundraiseId: string;
};

export type TransactionDetails = {
  transactionId: string;
  title: string;
  amount: number;
  date: string;
  type: string;
  status: string;
  sourceAccountNumber: string;
  destinationAccountNumber: string;
};

export type UpdateUserPayload = {
  email: string;
  name: string;
  surname: string;
};

export type CreateChildPayload = {
  name: string;
  classId: string | null;
};

export type UpdateChildPayload = {
  name: string;
  classId: string | null;
};
