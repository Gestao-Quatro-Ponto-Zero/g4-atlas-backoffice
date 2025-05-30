import { Badge } from "@/components/ui/badge";
import type { Order } from "@/data/mockData";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";

export const PaymentStatusBadge = ({ order }: { order: Order }) => {
	if (order.status === "approved") {
		return (
			<Badge
				variant="outline"
				className="border-green-100 bg-green-50 text-green-700"
			>
				<CheckCircleIcon className="mr-1 h-3 w-3" />
				Pago
			</Badge>
		);
	}
	if (order.status === "pending") {
		return (
			<Badge
				variant="outline"
				className="border-amber-100 bg-amber-50 text-amber-700"
			>
				<ClockIcon className="mr-1 h-3 w-3" />À pagar
			</Badge>
		);
	}
	if (order.status === "denied") {
		return (
			<Badge
				variant="outline"
				className="border-red-100 bg-red-50 text-red-700"
			>
				<XCircleIcon className="mr-1 h-3 w-3" />
				Valores em Aberto
			</Badge>
		);
	}

	return null;
};
