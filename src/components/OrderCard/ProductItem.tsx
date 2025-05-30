import type { Product } from "@/data/mockData";
import { formatCurrency } from "@/utils/formatters";
import { PackageIcon } from "lucide-react";

export const ProductItem = ({
	name,
	price,
	quantity,
}: {
	name: Product["name"];
	price: Product["price"];
	quantity: Product["quantity"];
}) => {
	return (
		<div className="mb-2 flex items-center justify-between rounded-md bg-gray-50 p-3 last:mb-0">
			<div className="flex items-center">
				<PackageIcon className="mr-2 h-4 w-4 text-gray-500" />
				<span className="font-medium text-sm">{name}</span>
				{quantity > 1 && (
					<span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-gray-700 text-xs">
						{quantity}x
					</span>
				)}
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm">{formatCurrency(price * quantity)}</span>
			</div>
		</div>
	);
};
