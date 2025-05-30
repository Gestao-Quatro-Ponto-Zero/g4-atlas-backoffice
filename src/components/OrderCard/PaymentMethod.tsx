import type { PaymentDetails } from "@/data/mockData";
import { LandmarkIcon, SmartphoneIcon } from "lucide-react";
import { CardPayment } from "./CardPayment";
import { InstallmentInfo } from "./InstallmentInfo";

export const PaymentMethod = ({ payment }: { payment: PaymentDetails }) => {
	switch (payment.method) {
		case "credit_card":
			return (
				<CardPayment
					payment={payment}
					type="credit"
				/>
			);

		case "debit_card":
			return (
				<CardPayment
					payment={payment}
					type="debit"
				/>
			);

		case "boleto":
			return (
				<div className="flex items-center space-x-2">
					<div className="flex h-6 w-8 items-center justify-center rounded border border-gray-200 bg-gray-100">
						<LandmarkIcon className="h-4 w-4 text-gray-500" />
					</div>
					<div>
						<span className="text-sm">
							{payment.isRecurring ? "Boleto Recorrente" : "Boleto Bancário"}
						</span>
						<InstallmentInfo
							installments={payment.installments || 1}
							amount={payment.amount}
						/>
					</div>
				</div>
			);

		case "pix":
			return (
				<div className="flex items-center space-x-2">
					<div className="flex h-6 w-8 items-center justify-center rounded border border-green-200 bg-green-100 text-green-700">
						<SmartphoneIcon className="h-4 w-4" />
					</div>
					<div className="text-sm">Pix</div>
				</div>
			);

		default:
			return <div className="text-sm">{payment.method}</div>;
	}
};
