import { CreditCardIcon, FileTextIcon, ReceiptIcon } from "lucide-react";

export const PaymentMethodDisplay = ({ method }: { method: string }) => {
	switch (method) {
		case "credit_card":
			return (
				<div className="flex items-center">
					<CreditCardIcon className="mr-1 hidden h-4 w-4 text-blue-600 md:inline" />
					<span>Cartão de Crédito</span>
				</div>
			);
		case "pix":
			return (
				<div className="flex items-center">
					<ReceiptIcon className="mr-1 hidden h-4 w-4 text-green-600 md:inline" />
					<span>PIX</span>
				</div>
			);
		case "boleto":
			return (
				<div className="flex items-center">
					<FileTextIcon className="mr-1 hidden h-4 w-4 text-gray-600 md:inline" />
					<span>Boleto</span>
				</div>
			);
		default:
			return method;
	}
};
