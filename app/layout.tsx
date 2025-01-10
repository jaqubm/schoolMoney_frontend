'use client'

import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })
const queryClient = new QueryClient()

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="w-full min-h-[calc(100dvh-4rem)] mx-auto overflow-hidden flex flex-col justify-center items-center">
                            {children}
                        </div>
                        <Toaster />
                    </ThemeProvider>
                </QueryClientProvider>
            </body>
        </html>
    )
}
