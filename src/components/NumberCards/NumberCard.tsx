import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon } from "lucide-react";
import type { ReactNode } from "react";

export const NumberCard = ({
	title,
	icon,
	value,
	status,
}: {
	title: string;
	icon: ReactNode;
	value: string;
	status: string;
}) => {
	return (
		<Card>
			<CardHeader className="grid grid-cols-[1fr_auto]">
				<CardTitle className="font-medium text-gray-400 text-sm">
					{title}
				</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="font-bold text-2xl text-gray-300">{value}</div>
				<div className="grid grid-flow-col place-content-start">
					<ClockIcon className="mr-1 h-3 w-3 text-yellow-500" />
					<p className="text-xs text-yellow-600">{status}</p>
				</div>
			</CardContent>
		</Card>
	);
};
