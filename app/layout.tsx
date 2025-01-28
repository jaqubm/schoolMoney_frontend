import {Inter} from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/toaster";
import {Metadata} from "next";
import {Header} from "@/components/Header";
import {QueryProvider} from "@/components/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "schoolMoney",
  description: "School Money - Website to manage yours class finances!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >

          <QueryProvider>

              <Header/>

              <div className="w-full min-h-[calc(100dvh-4rem)] mx-auto overflow-hidden flex flex-col justify-center items-center">
                {children}
              </div>

              <Toaster />

          </QueryProvider>

        </ThemeProvider>

      </body>
    </html>
  );
}
