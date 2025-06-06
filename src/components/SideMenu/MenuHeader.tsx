import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarHeader } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { use } from "react";

export const MenuHeader = () => {
	const { promise } = useAuth();
	const user = use(promise);
	const firstLetter = user?.name?.charAt(0) || "U";

	return (
		<SidebarHeader className="px2 grid place-items-center gap-4 py-4">
			<img
				src="/lovable-uploads/c078ae70-9089-43ad-8657-a628953d196f.png"
				alt="G4 Educação Logo"
				className="h-6 w-auto"
			/>

			<Avatar className="h-16 w-16 bg-[#ea384c] text-white text-xl">
				<AvatarFallback>{firstLetter}</AvatarFallback>
			</Avatar>
			<div className="grid place-items-center gap-1">
				<h3 className="font-medium text-sm">{user?.name}</h3>
				<p className="text-gray-500 text-xs">{user?.email}</p>
			</div>
		</SidebarHeader>
	);
};
