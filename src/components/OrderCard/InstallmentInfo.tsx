import type { PaymentDetails } from "@/data/mockData";
import { formatCurrency } from "@/utils/formatters";

export const InstallmentInfo = ({
	installments,
	amount,
}: {
	installments: PaymentDetails["installments"];
	amount: PaymentDetails["amount"];
}) => {
	if (installments <= 1) return null;

	return (
		<span className="text-gray-600 text-xs">
			{installments}x de {formatCurrency(amount / installments)}
		</span>
	);
};
