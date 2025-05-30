import { LayoutDashboardIcon, PackageIcon, UsersIcon } from "lucide-react";

export const getMenuItems = (pathname: string) => [
  {
    icon: LayoutDashboardIcon,
    label: "Dashboard",
    href: "/",
    active: pathname === "/",
  },
  {
    icon: UsersIcon,
    label: "Usuários",
    href: "/usuarios",
    active: pathname === "/usuarios",
  },
  {
    icon: PackageIcon,
    label: "Produtos",
    href: "/produtos",
    active: pathname === "/produtos",
  },
];