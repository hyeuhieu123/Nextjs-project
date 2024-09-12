import "../globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ClerkProvider } from '@clerk/nextjs'

import { cn } from "@/shared/lib/utils";
import { Navbar } from "@/shared/components/layout/navbar";
import Providers from "../providers";


const inter = Montserrat({ subsets: ["latin"]});

export const metadata: Metadata = {
    title: "E-Commerce",
    description: "E-Commerce",
};

export default async function RootLayout({
    children,
    params: { locale }
}: Readonly<{
    children: React.ReactNode
    params: { locale: string }
}>) {
    unstable_setRequestLocale(locale);

    const translate = await getMessages();

    return (
        <ClerkProvider>
            <NextIntlClientProvider messages={translate}>
                <html lang={locale} suppressHydrationWarning>
                    <body className={cn("min-h-screen bg-background", inter.className)}>
                        <Providers>
                            <Navbar />
                            <main className="w-full h-full overflow-x-hidden">
                                {children}
                            </main>
                        </Providers>
                    </body>
                </html>
            </NextIntlClientProvider>
        </ClerkProvider>
    );
}
