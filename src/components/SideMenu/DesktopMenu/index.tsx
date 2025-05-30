import {
	Sidebar,
	SidebarContent,
	SidebarProvider,
} from "@/components/ui/sidebar";
import { MenuFooter } from "./MenuFooter";
import { MenuHeader } from "./MenuHeader";
import { MenuItems } from "./MenuItems";

export const DesktopMenu = () => {
	return (
		<SidebarProvider defaultOpen>
			<Sidebar
				variant="floating"
				className="hidden w-[220px] md:flex"
			>
				<MenuHeader />
				<SidebarContent className="px-2 py-2">
					<MenuItems />
				</SidebarContent>
				<MenuFooter />
			</Sidebar>
		</SidebarProvider>
	);
};
