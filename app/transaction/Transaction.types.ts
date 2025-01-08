export type WithdrawPayload = {
  amount: number;
  destinationAccountNumber: string;
};

export type DepositPayload = {
  amount: number;
  sourceAccountNumber: string;
};

export type TransferPayload = {
  amount: number;
  destinationAccountNumber: string;
};

export type TransactionDetails = {
  transactionId: string;
  amount: number;
  date: string;
  type: string;
  status: string;
  sourceAccountNumber: string;
  destinationAccountNumber: string;
};

export type Transaction = {
  date: string;
  type: string;
  amount: number;
  name: string;
  surname: string;
};

export type Transactions = {
  transactions: Transaction[];
};

export enum TransactionFilterOption {
  All = "All",
  Deposit = "Deposit",
  Withdrawal = "Withdrawal",
  Newest = "Newest",
  Oldest = "Oldest",
}
