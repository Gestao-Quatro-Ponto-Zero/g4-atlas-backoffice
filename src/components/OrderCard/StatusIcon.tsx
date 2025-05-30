import type { Order } from "@/data/mockData";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";

export const StatusIcon = ({ order }: { order: Order }) => {
	switch (order.status) {
		case "approved":
			return <CheckCircleIcon className="h-4 w-4" />;
		case "pending":
			return <ClockIcon className="h-4 w-4" />;
		case "denied":
			return <XCircleIcon className="h-4 w-4" />;
		default:
			return null;
	}
};
