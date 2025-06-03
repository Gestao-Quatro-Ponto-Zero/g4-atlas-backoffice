import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
	ChevronRightIcon,
	LayoutDashboardIcon,
	PackageIcon,
	UsersIcon,
} from "lucide-react";

export const NavigationItems = () => {
	const pathname = useRouterState({ select: state => state.location.pathname });

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
		<div className="flex flex-col py-2">
			{menuItems.map(item => (
				<div
					key={item.label}
					className="relative"
				>
					<Link
						preload="intent"
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
	);
};
