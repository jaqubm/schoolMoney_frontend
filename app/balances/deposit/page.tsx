"use client";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/queries/user";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const DepositPage = () => {
	const router = useRouter();
	const { data: userData, isLoading: loadingUser } = useUserData();

	return (
		<div className="flex flex-col w-screen h-screen">
			{/* Header */}
			<Header withBorder>
				<div className="flex items-center py-[27.5px] mr-[40px]">
          <span className="text-lg mr-[22px]">
            {loadingUser ? "Loading..." : `Welcome, ${userData?.name || "User"}`}
          </span>
					<Avatar>
						<AvatarFallback>
							{loadingUser ? "..." : userData?.name?.[0] || "U"}
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
							onClick={() => router.push("/balances")}
							className="flex items-center gap-2 text-secondary hover:text-gray-800"
						>
							<ArrowLeftIcon className="w-5 h-5" />
							<span className="text-lg font-bold">Make a deposit</span>
						</button>
					</div>

					<div className="flex justify-center items-center mt-10">
						<div className="w-full max-w-[800px] p-10 border rounded-lg shadow">
							<div className="grid grid-cols-2 gap-8 mb-6">
								<div>
									<label
										htmlFor="title"
										className="block text-gray-500 text-sm mb-1"
									>
										Title
									</label>
									<Input
										id="title"
										placeholder="Enter your deposit title"
										className="w-full"
									/>
								</div>
								<div>
									<label
										htmlFor="amount"
										className="block text-gray-500 text-sm mb-1"
									>
										Amount
									</label>
									<Input
										id="amount"
										placeholder="Enter your deposit amount"
										type="number"
										className="w-full"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="description"
									className="block text-gray-500 text-sm mb-1"
								>
									Description
								</label>
								<Input
									id="description"
									placeholder="Enter your deposit description"
									className="w-full"
								/>
							</div>

							<div className="flex justify-center mt-8">
								<Button className="bg-blue-500 text-white px-8 py-3 rounded-lg">
									Make a deposit
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DepositPage;
