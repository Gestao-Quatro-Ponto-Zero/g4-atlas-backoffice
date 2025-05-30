import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, XIcon } from "lucide-react";
import { UsersIcon } from "lucide-react";
import { PackageIcon } from "lucide-react";
import { MenuIcon } from "lucide-react";
import { ChevronRightIcon } from "lucide-react";
import { use } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const MobileMenu = () => {
	const { promise } = useAuth();
	const user = use(promise);
	const firstLetter = user?.name?.charAt(0) || "U";
	const location = useLocation();
	const pathname = location.pathname;

	const menuItems = [
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

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
				>
					<MenuIcon className="h-5 w-5" />
					<span className="sr-only">Abrir menu</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent className="h-[95%]">
				<DrawerHeader>
					<DrawerTitle className="sr-only">Menu de navegação</DrawerTitle>
					<DrawerDescription className="sr-only">
						Menu principal da aplicação
					</DrawerDescription>
				</DrawerHeader>
				<div className="border-b p-4">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<img
										src="/lovable-uploads/c078ae70-9089-43ad-8657-a628953d196f.png"
										alt="G4 Educação Logo"
										className="h-6 w-auto object-contain"
									/>
								</div>
								<DrawerClose asChild>
									<Button
										variant="ghost"
										size="icon"
									>
										<XIcon className="h-4 w-4" />
									</Button>
								</DrawerClose>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center py-4">
						<Avatar className="h-20 w-20 bg-[#ea384c] text-white text-xl">
							<AvatarFallback>{firstLetter}</AvatarFallback>
						</Avatar>
						<h3 className="mt-4 font-medium text-base">{user?.name}</h3>
						<p className="text-gray-500 text-sm">{user?.email}</p>
					</div>
				</div>

				<div className="flex flex-col py-2">
					{menuItems.map(item => (
						<div
							key={item.label}
							className="relative"
						>
							<Link
								prefetch="intent"
								to={item.href}
								className={cn(
									"flex items-center justify-between px-6 py-4 hover:bg-gray-50",
									item.active && "bg-gray-50",
								)}
							>
								<div className="flex items-center">
									<item.icon
										className={cn(
											"h-5 w-5 text-gray-700",
											item.active && "text-[#ea384c]",
										)}
									/>
									<span className="ml-3 font-medium text-sm">{item.label}</span>
								</div>
								<ChevronRightIcon className="h-4 w-4 text-gray-400" />
							</Link>
						</div>
					))}
				</div>

				<div className="mt-auto p-6">
					<div className="flex justify-center">
						<Button
							variant="outline"
							className="rounded-full text-sm"
						>
							Ajuda
						</Button>
					</div>
					<div className="mt-6 flex justify-center space-x-4 text-gray-500 text-xs">
						<Link
							prefetch="intent"
							to="/termos"
							className="hover:underline"
						>
							Termos
						</Link>
						<Link
							prefetch="intent"
							to="/privacidade"
							className="hover:underline"
						>
							Privacidade
						</Link>
						<Link
							prefetch="intent"
							to="/cookies"
							className="hover:underline"
						>
							Cookies
						</Link>
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
};
