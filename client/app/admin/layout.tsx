import "../globals.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { Toaster } from "@/shared/components/ui/toaster";

import Providers from '../providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Admin E-Commerce',
    description: 'Admin E-Commerce'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html
                lang='en'
                className='scroll-smooth antialiased'
                suppressHydrationWarning
            >
                <body className={`flex min-h-screen flex-col ${inter.className}`}>
                    <Providers>
                        <div className='grow'>
                            <Toaster />
                            {children}
                        </div>
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    )
}
