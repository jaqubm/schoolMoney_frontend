'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/Header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserData } from '@/queries/user';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDeposit } from '@/queries/transaction';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import {
    depositSchema,
    DepositFormValues,
} from '@/app/balances/deposit/depositValidationRules';

const DepositPage = () => {
    const router = useRouter();
    const { data: userData, isLoading: loadingUser } = useUserData();
    const { mutate: makeDeposit, isLoading: depositLoading } = useDeposit();

    const form = useForm<DepositFormValues>({
        resolver: zodResolver(depositSchema),
        defaultValues: {
            title: '',
            amount: 0,
            description: '',
        },
    });

    const handleDeposit: SubmitHandler<DepositFormValues> = (data) => {
        makeDeposit(
            {
                amount: data.amount,
                sourceAccountNumber: '12 1234 1234 1234 1234', // Example account number, replace dynamically if necessary
            },
            {
                onSuccess: () => {
                    toast({
                        title: 'Deposit successful',
                        description: 'Your deposit was successfully made.',
                    });
                    router.push('/balances'); // Redirect to balances page
                },
                onError: () => {
                    toast({
                        title: 'Deposit failed',
                        description: 'There was an error making your deposit.',
                        variant: 'destructive',
                    });
                },
            }
        );
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Header */}
            <Header withBorder>
                <div className="flex items-center py-[27.5px] mr-[40px]">
                    <span className="text-lg mr-[22px]">
                        {loadingUser
                            ? 'Loading...'
                            : `Welcome, ${userData?.name || 'User'}`}
                    </span>
                    <Avatar>
                        <AvatarFallback>
                            {loadingUser ? '...' : userData?.name?.[0] || 'U'}
                        </AvatarFallback>
                    </Avatar>
                </div>
            </Header>

            {/* Main Content */}
            <div className="flex w-full h-full overflow-hidden">
                {/* Sidebar */}
                <div className="flex w-full max-w-[339px] h-full border">
                    <Sidebar />
                </div>

                {/* Deposit Section */}
                <div className="flex flex-col w-full h-full px-16 py-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-secondary hover:text-gray-800"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                            <span className="text-lg font-bold">
                                Make a deposit
                            </span>
                        </button>
                    </div>

                    <form
                        onSubmit={form.handleSubmit(handleDeposit)}
                        className="shadow-md rounded-lg p-8 w-full max-w-3xl mx-auto"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {/* Title Field */}
                            <div className="flex flex-col">
                                <label
                                    htmlFor="title"
                                    className="text-gray-500"
                                >
                                    Title
                                </label>
                                <Input
                                    id="title"
                                    placeholder="Title"
                                    {...form.register('title')}
                                />
                                {form.formState.errors.title && (
                                    <span className="text-red-500 text-sm">
                                        {form.formState.errors.title.message}
                                    </span>
                                )}
                            </div>

                            {/* Amount Field */}
                            <div className="flex flex-col">
                                <label
                                    htmlFor="amount"
                                    className="text-gray-500"
                                >
                                    Amount
                                </label>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="Amount"
                                    {...form.register('amount', {
                                        valueAsNumber: true,
                                    })}
                                />
                                {form.formState.errors.amount && (
                                    <span className="text-red-500 text-sm">
                                        {form.formState.errors.amount.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description Field */}
                        <div className="flex flex-col mt-4">
                            <label
                                htmlFor="description"
                                className="text-gray-500"
                            >
                                Description
                            </label>
                            <Input
                                id="description"
                                placeholder="Description"
                                {...form.register('description')}
                            />
                            {form.formState.errors.description && (
                                <span className="text-red-500 text-sm">
                                    {form.formState.errors.description.message}
                                </span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 flex justify-center">
                            <Button
                                type="submit"
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                                disabled={depositLoading}
                            >
                                {depositLoading
                                    ? 'Processing...'
                                    : 'Make a deposit'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;
