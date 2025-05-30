import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import type { Order, PaymentDetails } from "@/data/mockData";
import {
	ArrowRightIcon,
	CreditCardIcon,
	ReceiptIcon,
	RefreshCwIcon,
} from "lucide-react";

export const PaymentActions = ({
	payment,
	order,
	handleRetryPayment,
}: {
	payment: PaymentDetails;
	order: Order;
	handleRetryPayment: () => void;
}) => {
	if (order.status === "denied") {
		return (
			<div className="mt-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							size="sm"
							className="w-full"
						>
							<RefreshCwIcon className="mr-2 h-4 w-4" />
							Tentar Novamente
						</Button>
					</DialogTrigger>
					<DialogContent className="md:max-w-md">
						<DialogHeader>
							<DialogTitle>Tentar pagamento novamente</DialogTitle>
							<DialogDescription>
								Escolha um método de pagamento para tentar novamente.
							</DialogDescription>
						</DialogHeader>
						<div className="grid gap-4 py-4">
							<Button
								className="flex w-full items-center justify-between"
								onClick={handleRetryPayment}
							>
								<div className="flex items-center">
									<CreditCardIcon className="mr-2 h-4 w-4" />
									<span>Cartão de Crédito</span>
								</div>
								<ArrowRightIcon className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								className="flex w-full items-center justify-between"
								onClick={handleRetryPayment}
							>
								<div className="flex items-center">
									<ReceiptIcon className="mr-2 h-4 w-4" />
									<span>Boleto Bancário</span>
								</div>
								<ArrowRightIcon className="h-4 w-4" />
							</Button>
						</div>
						<DialogFooter className="md:justify-start">
							<DialogTrigger asChild>
								<Button
									type="button"
									variant="secondary"
								>
									Cancelar
								</Button>
							</DialogTrigger>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		);
	}

	if (
		payment.receiptUrl &&
		(order.status === "approved" || order.status === "pending")
	) {
		return (
			<div className="mt-2">
				<a
					href={payment.receiptUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center text-blue-600 text-sm hover:underline"
				>
					<ReceiptIcon className="mr-1 h-4 w-4" />
					Visualizar comprovante
				</a>
			</div>
		);
	}

	return null;
};
