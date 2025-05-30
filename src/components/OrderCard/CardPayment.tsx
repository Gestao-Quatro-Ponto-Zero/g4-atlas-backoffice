import type { PaymentCard, PaymentDetails } from "@/data/mockData";
import { CardBrandIcon } from "./CardBrandIcon";
import { InstallmentInfo } from "./InstallmentInfo";

export const CardPayment = ({
	payment,
	type,
}: { payment: PaymentDetails; type: PaymentCard["type"] }) => {
	if (!payment.cardDetails) return null;

	const isRecurring =
		type === "credit" &&
		(payment.isRecurring || payment.cardDetails.isRecurring);
	const label =
		type === "credit"
			? isRecurring
				? "Cartão Recorrente"
				: "Cartão de Crédito"
			: "Cartão de Débito";

	return (
		<div className="flex items-center space-x-2">
			<CardBrandIcon brand={payment.cardDetails.brand} />
			<div>
				<div className="flex items-center">
					<span className="font-medium text-sm">
						•••• {payment.cardDetails.lastFourDigits}
					</span>
					<span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs">
						{label}
					</span>
				</div>
				{type === "credit" && (
					<InstallmentInfo
						installments={payment.installments || 1}
						amount={payment.amount}
					/>
				)}
			</div>
		</div>
	);
};
