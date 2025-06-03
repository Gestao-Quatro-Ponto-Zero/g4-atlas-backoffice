import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRightIcon } from "lucide-react";
import { getMenuItems } from "../menuItems";

export const MenuItems = () => {
	const pathname = useRouterState({ select: state => state.location.pathname });
	const menuItems = getMenuItems(pathname);

	return (
		<SidebarMenu>
			{menuItems.map(item => (
				<SidebarMenuItem key={item.label}>
					<SidebarMenuButton
						asChild
						isActive={item.active}
					>
						<Link
							preload="intent"
							to={item.href}
							className="group/menu-button flex items-center justify-between"
						>
							<div className="flex items-center">
								<item.icon
									className={cn("h-4 w-4", item.active ? "text-[#ea384c]" : "")}
								/>
								<span className="ml-2 text-sm">{item.label}</span>
							</div>
							<ChevronRightIcon className="h-3 w-3 opacity-70" />
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
};
