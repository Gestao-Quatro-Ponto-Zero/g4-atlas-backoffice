import type { Contract } from "@/data/mockData";
import {
	AlertCircleIcon,
	CheckCircleIcon,
	ClockAlertIcon,
	FileTextIcon,
	XCircleIcon,
} from "lucide-react";

export const ContractIcon = ({ status }: { status: Contract["status"] }) => {
	switch (status) {
		case "active":
			return <CheckCircleIcon className="mr-1.5 h-3.5 w-3.5" />;
		case "pending":
			return <ClockAlertIcon className="mr-1.5 h-3.5 w-3.5" />;
		case "expired":
			return <AlertCircleIcon className="mr-1.5 h-3.5 w-3.5" />;
		case "canceled":
			return <XCircleIcon className="mr-1.5 h-3.5 w-3.5" />;
		default:
			return <FileTextIcon className="mr-1.5 h-3.5 w-3.5" />;
	}
};
