import type { Order } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/formatters";

export const OrderSummary = ({
	date,
	total,
}: { date: Order["date"]; total: number }) => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="rounded-md bg-gray-50/70 p-3">
				<p className="font-medium text-gray-500 text-xs uppercase">Data</p>
				<p className="mt-1 font-medium text-sm">{formatDate(date)}</p>
			</div>

			<div className="rounded-md bg-gray-50/70 p-3">
				<p className="font-medium text-gray-500 text-xs uppercase">
					Valor Total
				</p>
				<p className="mt-1 font-medium text-sm">{formatCurrency(total)}</p>
			</div>
		</div>
	);
};
