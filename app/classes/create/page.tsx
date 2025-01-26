"use client";

import { Sidebar } from "@/components/sidebar";
import {ArrowLeftIcon, Check, ChevronsUpDown} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Header } from "@/components/Header";
import { useCreateClass } from "@/queries/class";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
    createClassSchema,
    CreateClassFormValues,
} from "@/app/classes/create/classRules";
import React from "react";
import { cn } from "@/lib/utils";

export default function CreateClassPage() {
    const router = useRouter();
    const { mutate: createClass, isLoading: creatingClass } = useCreateClass();

    const form = useForm<CreateClassFormValues>({
        resolver: zodResolver(createClassSchema),
        defaultValues: {
            name: "",
            schoolName: "",
        },
    });

    const onSubmit = (data: CreateClassFormValues) => {
        createClass(data, {
            onSuccess: () => {
                router.push("/classes");
            },
        });
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            <Header withBorder>
                <div className="flex items-center py-[27.5px] mr-[40px]">
                    <span className="text-lg mr-[22px]">Create Class</span>
                    <Avatar>
                        <AvatarFallback>CC</AvatarFallback>
                    </Avatar>
                </div>
            </Header>

            <div className="flex w-full h-full">
                <div className="flex w-full max-w-[339px] h-full border">
                    <Sidebar />
                </div>

                <div className="flex flex-col w-full h-full px-16 py-10">
                    <button
                        className="flex items-center gap-4 text-secondary hover:text-gray-800 mb-6"
                        onClick={() => router.back()}
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        <span className="text-xl font-bold">Back</span>
                    </button>

                    <div className="flex w-full h-full gap-10 justify-center">
                        <div className="flex flex-col items-center justify-center w-full max-w-[512px] max-h-[512px] border rounded-lg">
                            <Avatar className="w-52 h-52">
                                <AvatarFallback className="text-4xl">
                                    {form.watch("name")?.[0]?.toUpperCase() || "C"}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="w-full h-full max-h-[512px] max-w-5xl border rounded-lg p-10">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className="flex flex-col gap-5"
                                >
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Class Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter class name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="schoolName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>School Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter school name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="font-poppins text-base w-72 rounded-bl font-semibold bg-blue text-white shadow hover:bg-blueLight self-center mt-8"
                                        disabled={creatingClass}
                                    >
                                        {creatingClass ? "Creating..." : "Create Class"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
