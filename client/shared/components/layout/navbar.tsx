"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";

import { useRouter } from "@/shared/hooks/use-nextIntl";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { ChevronsDown, Menu, Search, ShoppingCart, User } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Separator } from "@/shared/components/ui/separator";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/shared/components/ui/navigation-menu";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/components/ui/dialog";

import { useGetProductBySearch } from "@/server/_actions/product-action";
import { useDebounce } from "@/shared/hooks/use-debounce";

import useScrollThreshold from "@/shared/hooks/use-scroll-threshold";

import { ToggleTheme } from "./toogle-theme";
interface RouteProps {
    href: string;
    label: string;
}

interface FeatureProps {
    title: string;
    description: string;
}

const routeList: RouteProps[] = [
    {
        href: "#",
        label: " Nam",
    },
    {
        href: "#",
        label: "Nữ",
    },
    {
        href: "#contact",
        label: "Trẻ em",
    },
    {
        href: "#faq",
        label: "Thể thao",
    },
];



export const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const ref = useRef<HTMLDivElement>(null)
    const pathName = usePathname()
    const router = useRouter()
    const isScrolled = useScrollThreshold(100);
    const debouncedQuery = useDebounce(searchQuery, 300);

    const checkSpecialPage = pathName.split("/")[2] === "product"

    const { data, error, isLoading } = useGetProductBySearch(debouncedQuery);

    return (
        <header
            ref={ref}
            className={cn(
                "shadow-inner bg-opacity-15 transition-all ease-in-out duration-300 left-1/2 transform -translate-x-1/2 mx-auto fixed border border-secondary z-40 flex justify-between items-center p-2 bg-card",
                checkSpecialPage ? "stricky w-full top-0 rounded-none" :
                    (isScrolled ? "w-full top-0 rounded-none" : "w-full md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-0 md:top-5 rounded-none md:rounded-2xl")
            )}

        >
            <Link href="/" className="flex items-center text-lg font-bold">
            <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Adidas_2022_logo.svg"
                                    alt="RadixLogo"
                                
                                    width={50}
                                    height={50}
                                />
                
              
            </Link>
           

            {/* <!-- Desktop --> */}
            <NavigationMenu className="hidden mx-auto lg:block">
                <NavigationMenuList>
                    <NavigationMenuItem>
                      
                        <NavigationMenuContent>
                            <div className="grid w-[600px] grid-cols-2 gap-5 p-4">
                                
                               
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        {routeList.map(({ href, label }) => (
                            <NavigationMenuLink key={href} asChild>
                                <Link href={href} className="px-2 text-base">
                                    {label}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className="items-center justify-center hidden lg:flex">
                <Dialog open={isSearch} onOpenChange={setIsSearch}>
                    <DialogTrigger asChild>
                        <div className="cursor-pointer">
                            <Search className="size-5" />
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-y-auto">
                        <Input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="sticky rounded-sm"
                        />
                        {isLoading && <p>Loading...</p>}
                        <ul className="flex flex-col items-start justify-start gap-3">
                            {data?.map((product: any) => (
                                <li key={product.id} className="w-full px-2 py-1 border rounded-sm cursor-pointer border-neutral-400"
                                    onClick={() => {
                                        router.push(`/product/${product.id}`)
                                        setIsSearch(false)
                                    }}>
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    </DialogContent>
                </Dialog>
                <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
                    <Link
                        aria-label="View on GitHub"
                        href="https://github.com/nobruf/shadcn-landing-page.git"
                        target="_blank"
                    >
                        <User className="size-5" />
                    </Link>
                </Button>

                <Popover>
                    <PopoverTrigger>
                        <ShoppingCart className="size-5" />
                    </PopoverTrigger>
                    <PopoverContent side="bottom">
                        <div className="text-center">Túi của bạn trống</div>
                    </PopoverContent>
                </Popover>

                <ToggleTheme />

            </div>
        </header>
    );
};
