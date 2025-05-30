import type { Order } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { StatusIcon } from "./StatusIcon";
import { getStatusStyles, getStatusText } from "./utils";

export const OrderHeader = ({ order }: { order: Order }) => {
	return (
		<div className="border-gray-100 border-b bg-gray-50/50 px-4 py-3">
			<div className="flex items-center justify-between">
				<div className="font-medium text-gray-900 text-sm">
					Pedido #{order.id}
				</div>
				<div
					className={cn(
						"flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-medium text-xs",
						getStatusStyles(order.status),
					)}
				>
					<StatusIcon order={order} />
					<span>{getStatusText(order.status)}</span>
				</div>
			</div>
		</div>
	);
};
