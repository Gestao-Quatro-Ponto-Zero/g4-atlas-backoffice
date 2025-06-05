
import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";

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
				<a
					href="/termos"
					className="hover:underline"
				>
					Termos
				</a>
				<a
					href="/privacidade"
					className="hover:underline"
				>
					Privacidade
				</a>
				<a
					href="/cookies"
					className="hover:underline"
				>
					Cookies
				</a>
			</div>
		</SidebarFooter>
	);
};
