import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
	ChevronRightIcon,
	LayoutDashboardIcon,
	PackageIcon,
	UsersIcon,
} from "lucide-react";
import { use } from "react";
import { Link, useLocation } from "react-router-dom";

export const DesktopMenu = () => {
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
		<SidebarProvider defaultOpen={true}>
			<Sidebar
				variant="floating"
				className="hidden w-[220px] md:flex"
			>
				<SidebarHeader className="flex flex-col items-center px-2 py-4">
					<div className="flex items-center pb-4">
						<img
							src="/lovable-uploads/c078ae70-9089-43ad-8657-a628953d196f.png"
							alt="G4 Educação Logo"
							className="h-6 w-auto"
						/>
					</div>

					<Avatar className="h-16 w-16 bg-[#ea384c] text-white text-xl">
						<AvatarFallback>{firstLetter}</AvatarFallback>
					</Avatar>
					<h3 className="mt-3 font-medium text-sm">{user?.name}</h3>
					<p className="text-gray-500 text-xs">{user?.email}</p>
				</SidebarHeader>

				<SidebarContent className="px-2 py-2">
					<SidebarMenu>
						{menuItems.map(item => (
							<SidebarMenuItem key={item.label}>
								<SidebarMenuButton
									asChild
									isActive={item.active}
								>
									<Link
										prefetch="intent"
										to={item.href}
										className="group/menu-button flex items-center justify-between"
									>
										<div className="flex items-center">
											<item.icon
												className={cn(
													"h-4 w-4",
													item.active ? "text-[#ea384c]" : "",
												)}
											/>
											<span className="ml-2 text-sm">{item.label}</span>
										</div>
										<ChevronRightIcon className="h-3 w-3 opacity-70" />
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarContent>

				<SidebarFooter className="mt-auto px-3 py-4">
					<div className="flex justify-center">
						<Button
							variant="outline"
							className="w-full rounded-full text-sm"
						>
							Ajuda
						</Button>
					</div>
					<div className="mt-4 flex justify-center space-x-3 text-gray-500 text-xs">
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
				</SidebarFooter>
			</Sidebar>
		</SidebarProvider>
	);
};
