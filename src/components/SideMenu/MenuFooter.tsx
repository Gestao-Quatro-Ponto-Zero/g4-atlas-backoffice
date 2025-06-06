import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export const MenuFooter = () => {
	return (
		<SidebarFooter>
			<Button
				variant="outline"
				className="w-full rounded-full text-sm"
			>
				Ajuda
			</Button>
			<div className="grid grid-flow-col text-gray-500 text-xs">
				<Link
					preload="intent"
					to="/termos"
					className="hover:underline"
				>
					Termos
				</Link>
				<Link
					preload="intent"
					to="/privacidade"
					className="hover:underline"
				>
					Privacidade
				</Link>
				<Link
					preload="intent"
					to="/cookies"
					className="hover:underline"
				>
					Cookies
				</Link>
			</div>
		</SidebarFooter>
	);
};
