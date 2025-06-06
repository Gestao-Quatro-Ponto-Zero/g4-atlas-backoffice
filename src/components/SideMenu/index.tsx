import { Spinner } from "@/components/Spinner";
import {
	Sidebar,
	SidebarContent,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import { MenuFooter } from "./MenuFooter";
import { MenuHeader } from "./MenuHeader";
import { MenuItems } from "./MenuItems";

export const SideMenu = () => {
	return (
		<SidebarProvider defaultOpen>
			<Sidebar
				variant="floating"
				className="w-[220px] grid-cols-[auto_1fr_auto]"
			>
				<Suspense fallback={<Spinner />}>
					<MenuHeader />
				</Suspense>
				<SidebarContent className="px-2 py-2">
					<MenuItems />
				</SidebarContent>
				<MenuFooter />
			</Sidebar>
		</SidebarProvider>
	);
};
