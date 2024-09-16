import { NavItem } from "@/shared/types";

export const APP_SAVE_KEY = {
  LOCALE: process.env.NEXT_PUBLIC_APP_NAME + "::locale",
  TOKEN_KEY: process.env.NEXT_PUBLIC_APP_NAME + "::token_key",
  LOGIN_STATUS: process.env.NEXT_PUBLIC_APP_NAME + "::login_status",
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/admin/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Category",
    href: "/admin/category",
    icon: "category",
    label: "category",
  },
  {
    title: "Product",
    href: "/admin/product",
    icon: "product",
    label: "product",
  },
  {
    title: "Order",
    href: "/admin/order",
    icon: "order",
    label: "order",
  },
];
