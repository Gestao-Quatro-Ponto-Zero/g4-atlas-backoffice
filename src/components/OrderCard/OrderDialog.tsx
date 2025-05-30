import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { Order, Product } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { ContractDetails } from "./ContractDetails";
import { OrderActions } from "./OrderActions";
import { PaymentActions } from "./PaymentActions";
import { PaymentMethod } from "./PaymentMethod";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { ProductsTable } from "./ProductsTable";
import { getStatusText } from "./utils";

export const OrderDialog = ({
	order,
	isOpen,
	onClose,
	products,
	calculateOrderTotal,
	handleRetryPayment,
}: {
	order: Order;
	isOpen: boolean;
	onClose: () => void;
	products: Product[];
	calculateOrderTotal: () => number;
	handleRetryPayment: () => void;
}) => {
	const hasMultiplePayments = order.payments.length > 1;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent className="max-h-[90vh] overflow-y-auto md:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="flex items-center justify-between">
						<div>
							<span className="font-semibold text-lg">Pedido #{order.id}</span>
							<span
								className="ml-2 rounded-full px-2 py-0.5 text-xs"
								style={{
									backgroundColor:
										order.status === "approved"
											? "#dcfce7"
											: order.status === "pending"
												? "#fef9c3"
												: "#fee2e2",
								}}
							>
								{getStatusText(order.status)}
							</span>
						</div>
					</DialogTitle>
					<DialogDescription className="pt-2 pb-0">
						Realizado em {formatDate(order.date)}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-5">
					{/* Products section */}
					<div className="overflow-hidden rounded-lg bg-gray-50">
						<div className="p-4">
							{/* Desktop view - Table format */}
							<div className="hidden md:block">
								<ProductsTable products={products} />
							</div>

							{/* Mobile view - Cards format */}
							<div className="space-y-3 md:hidden">
								{products.map(product => (
									<div
										key={product.name}
										className="rounded-md border border-gray-100 bg-white p-3"
									>
										<div className="mb-2 font-medium text-sm">
											{product.name}
										</div>
										<div className="grid grid-cols-3 gap-2 text-xs">
											<div>
												<p className="text-gray-500">Valor Unit.</p>
												<p className="font-medium">
													{formatCurrency(product.price)}
												</p>
											</div>
											<div>
												<p className="text-gray-500">Quant.</p>
												<p className="font-medium">{product.quantity}</p>
											</div>
											<div>
												<p className="text-gray-500">Total</p>
												<p className="font-medium">
													{formatCurrency(product.price * product.quantity)}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Contract section */}
					{order.contract && (
						<div className="rounded-lg bg-gray-50 p-4">
							<ContractDetails contract={order.contract} />
						</div>
					)}

					{/* Payments section */}
					<div className="rounded-lg bg-gray-50 p-4">
						<div className="grid gap-4">
							{order.payments.map(payment => (
								<div
									key={payment.id}
									className="rounded-md border border-gray-100 bg-white p-3"
								>
									<div className="flex items-start justify-between">
										<div className="flex items-center">
											<PaymentMethod payment={payment} />
										</div>
										<div className="flex flex-col items-end text-right">
											<div className="font-medium text-sm">
												{formatCurrency(payment.amount)}
											</div>
											<div className="mt-1 flex flex-wrap justify-end gap-1">
												{hasMultiplePayments && (
													<span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-500 text-xs">
														{(
															(payment.amount / calculateOrderTotal()) *
															100
														).toFixed(0)}
														%
													</span>
												)}
												<PaymentStatusBadge order={order} />
											</div>
										</div>
									</div>
									<PaymentActions
										payment={payment}
										order={order}
										handleRetryPayment={handleRetryPayment}
									/>
								</div>
							))}
						</div>
					</div>

					{/* Actions */}
					<OrderActions orderId={order.id} />
				</div>
			</DialogContent>
		</Dialog>
	);
};
