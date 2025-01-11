'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/Header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGetTransactionById } from '@/queries/transaction';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useUserData } from '@/queries/user';

const TransactionDetailsPage = () => {
    const { data: userData, isLoading: loadingUser } = useUserData();
    const router = useRouter();
    const params = useParams();

    const transactionId = Array.isArray(params.transactionId)
        ? params.transactionId[0]
        : params.transactionId;

    const { data: transaction, isLoading } =
        useGetTransactionById(transactionId);

    if (isLoading) {
        return <p>Loading transaction details...</p>;
    }

    if (!transaction) {
        return <p>Transaction not found.</p>;
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Header */}
            <Header withBorder>
                <div className="flex items-center py-[27.5px] mr-[40px]">
                    <span className="text-lg mr-[22px]">
                        {loadingUser
                            ? 'Loading...'
                            : `Welcome, ${userData?.name || 'Guest'}`}
                    </span>
                    <Avatar>
                        <AvatarFallback>
                            {loadingUser ? '...' : userData?.name?.[0] || 'G'}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </Header>

            {/* Content */}
            <div className="flex w-full h-full overflow-hidden">
                {/* Sidebar */}
                <div className="flex w-full max-w-[339px] h-full border">
                    <Sidebar />
                </div>

                {/* Transaction Details */}
                <div className="flex flex-col w-full h-full px-16 py-10">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-secondary hover:text-gray-800 mb-6"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span className="text-lg font-bold">
                            Transaction details
                        </span>
                    </button>
                    <div className="flex flex-col p-8 w-full h-full max-h-80 max-w-3xl mx-auto border mt-3 rounded-lg">
                        <div className="w-full text-center">
                            <strong className="text-2xl">
                                {transaction.type}
                            </strong>
                        </div>
                        <div className="flex flex-col justify-evenly items-start h-full w-full">
                            <p>
                                <strong>Amount:</strong> ${transaction.amount}
                            </p>
                            <p>
                                <strong>Date:</strong>{' '}
                                {new Date(transaction.date).toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    }
                                )}
                            </p>
                            <p>
                                <strong>From:</strong>{' '}
                                {transaction.sourceAccountNumber || 'N/A'}
                            </p>
                            <p>
                                <strong>To:</strong>{' '}
                                {transaction.destinationAccountNumber || 'N/A'}
                            </p>
                            <p>
                                <strong>Payment method:</strong> Transfer to
                                account
                            </p>
                            <p>
                                <strong>Transaction reference number:</strong>{' '}
                                {transaction.transactionId}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailsPage;
