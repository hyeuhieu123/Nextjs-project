import Sidebar from "@/shared/components/layout/sidebar";
import Header from "@/shared/components/layout/header";

export default function MainLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full flex-1 overflow-hidden">
                <Header />
                {children}
            </main>
        </div>
    );
}
