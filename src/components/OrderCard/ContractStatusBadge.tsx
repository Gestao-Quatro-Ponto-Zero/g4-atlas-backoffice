import { Badge } from "@/components/ui/badge";
import type { Contract } from "@/data/mockData";
import {
	AlertCircleIcon,
	CheckCircleIcon,
	ClockAlertIcon,
	XCircleIcon,
} from "lucide-react";

export const ContractStatusBadge = ({
	status,
}: { status: Contract["status"] }) => {
	switch (status) {
		case "active":
			return (
				<Badge
					variant="outline"
					className="border-green-100 bg-green-50 text-green-700"
				>
					<CheckCircleIcon className="mr-1 h-3 w-3" />
					Ativo
				</Badge>
			);
		case "pending":
			return (
				<Badge
					variant="outline"
					className="border-amber-100 bg-amber-50 text-amber-700"
				>
					<ClockAlertIcon className="mr-1 h-3 w-3" />
					Pendente de Assinatura
				</Badge>
			);
		case "expired":
			return (
				<Badge
					variant="outline"
					className="border-gray-100 bg-gray-50 text-gray-700"
				>
					<AlertCircleIcon className="mr-1 h-3 w-3" />
					Expirado
				</Badge>
			);
		case "canceled":
			return (
				<Badge
					variant="outline"
					className="border-red-100 bg-red-50 text-red-700"
				>
					<XCircleIcon className="mr-1 h-3 w-3" />
					Cancelado
				</Badge>
			);
		default:
			return null;
	}
};
