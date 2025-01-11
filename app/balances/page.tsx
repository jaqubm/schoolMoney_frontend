'use client';

import { Sidebar } from '@/components/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useUserData } from '@/queries/user';
import { ActivityCard } from '@/components/activity-card';
import { useRouter } from 'next/navigation';

const BalancesPage = () => {
    const router = useRouter();
    const { data: userData, isLoading: loadingUser } = useUserData();

    const transactionHistory = [
        {
            title: 'Payment for School Trip to the Museum',
            transactionType: 'Deposit',
            amount: '$50',
            date: 'October 20, 2024',
            paidBy: 'John Doe',
        },
        {
            title: 'Payment for School Trip to the Museum',
            transactionType: 'Deposit',
            amount: '$50',
            date: 'October 20, 2024',
            paidBy: 'John Doe',
        },
        {
            title: 'Payment for School Trip to the Museum',
            transactionType: 'Deposit',
            amount: '$50',
            date: 'October 20, 2024',
            paidBy: 'John Doe',
        },
        {
            title: 'Payment for School Trip to the Museum',
            transactionType: 'Deposit',
            amount: '$50',
            date: 'October 20, 2024',
            paidBy: 'John Doe',
        },
        {
            title: 'Payment for School Trip to the Museum',
            transactionType: 'Deposit',
            amount: '$50',
            date: 'October 20, 2024',
            paidBy: 'John Doe',
        },
    ];

    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Upper screen */}
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

            {/* Lower screen */}
            <div className="flex w-full h-full overflow-hidden">
                {/* Left section */}
                <div className="flex w-full max-w-[339px] h-full border">
                    <Sidebar />
                </div>

                {/* Right section */}
                <div className="flex flex-col w-full h-full pl-[59px] pt-[19px]">
                    {/* Balances bar */}
                    <div className="flex w-full h-full min-h-[91px] max-h-[91px] gap-[30px] items-center">
                        <h2 className="text-4xl font-normal">Balances</h2>
                        <Button
                            onClick={() => router.push('/balances/deposit')}
                            variant="outline"
                            className="text-xl w-[284px] bg-blue"
                        >
                            Make a deposit
                        </Button>
                        <Button
                            variant="outline"
                            className="text-xl w-[236px] bg-blue"
                            onClick={() => router.push('/balances/withdraw')}
                        >
                            Withdraw funds
                        </Button>
                    </div>

                    {/* Balances overview */}
                    <div className="flex gap-10 mb-8">
                        <div className="flex-1 border rounded-lg p-6">
                            <h3 className="text-gray-500 text-sm mb-2">
                                Parent's bill
                            </h3>
                            <p className="text-2xl font-bold">
                                12 1234 1234 1234 1234 1234
                            </p>
                        </div>
                        <div className="flex-1 border rounded-lg p-6">
                            <h3 className="text-gray-500 text-sm mb-2">
                                Balance
                            </h3>
                            <p className="text-2xl font-bold">$150.00</p>
                        </div>
                    </div>

                    {/* Transaction history */}
                    <h3 className="text-gray-500 text-sm">
                        Transaction History
                    </h3>
                    <div className="flex flex-col w-full h-full items-center overflow-y-auto pr-[59px]">
                        <div className="flex flex-col w-full max-w-[1423px] gap-[54px] pt-[34px] mb-10">
                            {transactionHistory.map((transaction, index) => (
                                <ActivityCard
                                    key={index}
                                    activity={transaction}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BalancesPage;
