import { Button } from "@/components/ui/button";

export const MobileMenuFooter = () => {
	return (
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
		</div>
	);
};
