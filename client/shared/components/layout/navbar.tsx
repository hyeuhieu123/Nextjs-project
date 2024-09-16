"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "@/shared/hooks/use-nextIntl";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/shared/lib/utils";
import {
  ChevronsDown,
  Menu,
  Search,
  ShoppingCart,
  User,
  UserIcon,
} from "lucide-react";

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
import { Badge } from "@/shared/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

import { useGetProductBySearch } from "@/server/_actions/product-action";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCartLocalStorage } from "@/store/app-slice";

import useScrollThreshold from "@/shared/hooks/use-scroll-threshold";
import useLocalStorage from "@/shared/hooks/use-localStorage";

import { ToggleTheme } from "./toogle-theme";
import { UserNav } from "./user-nav";
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
    label: "Nam",
  },
  {
    href: "#",
    label: "Nữ",
  },
  {
    href: "#",
    label: "Trẻ em",
  },
  {
    href: "#",
    label: "Bơi lội",
  },
];

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [cart, setCart] = useLocalStorage<any>("carts", null);

  const ref = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isScrolled = useScrollThreshold(100);
  const debouncedQuery = useDebounce(searchQuery, 300);

  const checkSpecialPage =
    pathName.split("/")[2] === "product" ||
    pathName.split("/")[2] === "cart" ||
    pathName.split("/")[2] === "my-order";

  const { isSignedIn } = useUser();
  const { cartLocalStorage } = useAppSelector((state) => state.app);
  const { data, error, isLoading } = useGetProductBySearch(debouncedQuery);
  const handleNavigation = () => {
    router.push("/sign-in");
  };
  useEffect(() => {
    if (cart) {
      console.log(cart);
      dispatch(setCartLocalStorage(cart));
    }
  }, []);

  return (
    <header
      ref={ref}
      className={cn(
        "shadow-inner bg-opacity-15 transition-all ease-in-out duration-300 left-1/2 transform -translate-x-1/2 mx-auto fixed border border-secondary z-40 flex justify-between items-center p-2 bg-card",
        checkSpecialPage
          ? "stricky w-full top-0 rounded-none"
          : isScrolled
          ? "w-full top-0 rounded-none"
          : "w-full md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-0 md:top-5 rounded-none md:rounded-2xl"
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
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <ChevronsDown className="mr-2 text-white border rounded-lg bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary w-9 h-9" />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col items-start justify-start sm:flex-col">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden mx-auto lg:block">
        <NavigationMenuList>
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

      <div className="items-center justify-center hidden lg:flex gap-4">
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
                <li
                  key={product.id}
                  className="w-full px-2 py-1 border rounded-sm cursor-pointer border-neutral-400"
                  onClick={() => {
                    router.push(`/product/${product.id}`);
                    setIsSearch(false);
                  }}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>

        <Popover>
          <PopoverTrigger
            className="relative"
            onClick={() => cartLocalStorage.length > 0 && router.push("/cart")}
          >
            <ShoppingCart className="size-5" />
            <Badge className="absolute -top-2 -right-2 m-0 px-[6px] py-[2px] text-[8px]">
              {cartLocalStorage.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </Badge>
          </PopoverTrigger>
          {cartLocalStorage.length === 0 && (
            <PopoverContent
              side="bottom"
              className="w-full flex flex-col justify-start items-start gap-3"
            >
              <div className="text-center">Túi của bạn trống</div>
            </PopoverContent>
          )}
        </Popover>

        {isSignedIn ? (
          <UserNav />
        ) : (
          <Button variant="ghost" onClick={handleNavigation}>
            <UserIcon className="size-5" />
          </Button>
        )}

        <ToggleTheme />
      </div>
    </header>
  );
};
