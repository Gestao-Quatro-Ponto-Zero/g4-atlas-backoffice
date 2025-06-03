import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export const MenuFooter = () => {
	return (
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
