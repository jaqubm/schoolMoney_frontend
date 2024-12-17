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
