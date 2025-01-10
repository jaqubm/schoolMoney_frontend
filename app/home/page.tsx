'use client'

import { Sidebar } from '@/components/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Activity, ActivityCard } from '@/components/activity-card'
import { Header } from '@/components/Header'
import { useUserData } from '@/queries/user'

const HomePage = () => {
    const { data: userData, isLoading: loadingUser } = useUserData()

    const activityCards: Activity[] = [
        {
            title: 'Payment for School Trip to the Museum',
            transactionType: 'Deposit',
            amount: '$25',
            date: 'October 20, 2024',
            paidBy: 'John Doe',
        },
        {
            title: 'Donation to School Art Program',
            transactionType: 'Donation',
            amount: '$50',
            date: 'October 15, 2024',
            paidBy: 'Jane Smith',
        },
        {
            title: 'Payment for Science Project Materials',
            transactionType: 'Purchase',
            amount: '$15',
            date: 'October 10, 2024',
            paidBy: 'Michael Johnson',
        },
        {
            title: 'Payment for Science Project Materials',
            transactionType: 'Purchase',
            amount: '$15',
            date: 'October 10, 2024',
            paidBy: 'Michael Johnson',
        },
        {
            title: 'Payment for Science Project Materials',
            transactionType: 'Purchase',
            amount: '$15',
            date: 'October 10, 2024',
            paidBy: 'Michael Johnson',
        },
        {
            title: 'Payment for Science Project Materials',
            transactionType: 'Purchase',
            amount: '$15',
            date: 'October 10, 2024',
            paidBy: 'Michael Johnson',
        },
    ]

    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Upper screen*/}
            <Header withBorder>
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-[654px] h-[66px] rounded-lg text-base"
                />
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

            {/* Lower screen*/}
            <div className="flex w-full h-full overflow-hidden">
                {/* Left section*/}
                <div className="flex w-full max-w-[339px] h-full border">
                    <Sidebar />
                </div>
                {/* Right section */}
                <div className="flex flex-col w-full h-full pl-[59px] pt-[19px]">
                    {/* Recent activities bar */}
                    <div className="flex w-full h-full min-h-[91px] max-h-[91px] gap-[30px] items-center">
                        <h2 className="text-4xl font-normal">
                            Recent Activities
                        </h2>
                        <Button variant="outline" className="text-xl w-[284px]">
                            Contributed Fundraisers
                        </Button>
                        <Button variant="outline" className="text-xl w-[236px]">
                            Your Fundraisers
                        </Button>
                    </div>

                    {/* Activities history */}
                    <div className="flex flex-col w-full h-full items-center overflow-y-auto pr-[59px]">
                        <div className="flex flex-col w-full max-w-[1423px] gap-[54px] pt-[34px] mb-10">
                            {activityCards.map((activity, index) => (
                                <ActivityCard key={index} activity={activity} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
