"use client";

import { Sidebar } from "@/components/sidebar";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Header } from "@/components/Header";
import { useUserData } from "@/queries/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerKidSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	school: z.string().min(1, "School is required"),
	class: z.string().min(1, "Class is required"),
	dateOfBirth: z.string().min(1, "Date of Birth is required"),
	terms: z.boolean().refine((val) => val, "You must accept the terms and conditions"),
});

export default function RegisterKidPage() {
	const { data: userData, isLoading } = useUserData();
	const form = useForm({
		resolver: zodResolver(registerKidSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			school: "",
			class: "",
			dateOfBirth: "",
			terms: false,
		},
	});

	const onSubmit = (values: any) => {
		console.log("Kid Registration Data:", values);
	};

	return (
		<div className="flex flex-col w-screen h-screen">
			{/* Header */}
			<Header withBorder>
				<div className="flex items-center gap-4">
          <span className="text-lg">
            {isLoading ? "Loading..." : `Welcome, ${userData?.name || "Guest"}`}
          </span>
					<Avatar>
						<AvatarFallback>{isLoading ? "..." : userData?.name?.[0] || "G"}</AvatarFallback>
					</Avatar>
				</div>
			</Header>

			{/* Main Content */}
			<div className="flex w-full h-full overflow-hidden">
				{/* Sidebar */}
				<div className="flex w-full max-w-[339px] h-full border">
					<Sidebar />
				</div>

				{/* Registration Form */}
				<div className="flex flex-col w-full h-full px-16 py-10">
					<h2 className="text-4xl font-semibold mb-6">Register your kid</h2>
					<div className="flex gap-10">
						{/* Avatar Section */}
						<div className="flex flex-col items-center justify-center gap-4 w-1/3 border rounded-lg py-10">
							<Avatar className="w-40 h-40 bg-gray-200">
								<AvatarFallback>{isLoading ? "..." : userData?.name?.[0] || "G"}</AvatarFallback>
							</Avatar>
							<span className="text-gray-600">Add avatar</span>
						</div>

						{/* Form Section */}
						<div className="w-2/3 border rounded-lg p-10">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="grid grid-cols-2 gap-6"
								>
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>First Name</FormLabel>
												<FormControl>
													<Input placeholder="Enter your kid's first name" {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Name</FormLabel>
												<FormControl>
													<Input placeholder="Enter your kid's last name" {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="school"
										render={({ field }) => (
											<FormItem>
												<FormLabel>School</FormLabel>
												<FormControl>
													<Input placeholder="Enter your kid's school" {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="class"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Class</FormLabel>
												<FormControl>
													<Input placeholder="Enter your kid's class" {...field} />
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="dateOfBirth"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Date of Birth</FormLabel>
												<FormControl>
													<Input
														type="date"
														placeholder="Enter your kid's date of birth"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="terms"
										render={({ field }) => (
											<FormItem className="col-span-2">
												<FormControl>
													<div className="flex items-center gap-2">
														<Checkbox
															checked={field.value}
															onCheckedChange={field.onChange}
														/>
														<span className="text-sm">
                              I accept the terms and conditions and privacy policy
                            </span>
													</div>
												</FormControl>
											</FormItem>
										)}
									/>

									<div className="col-span-2 flex justify-center mt-4">
										<Button type="submit" className="w-1/2 bg-blue-500 text-white">
											Register
										</Button>
									</div>
								</form>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
