import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Charge } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { AlertCircleIcon, DownloadIcon, FileTextIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { PaymentMethodDisplay } from "./PaymentMethodDisplay";
import { StatusBadge } from "./StatusBadge";

export const ModalContent = ({
	selectedCharge,
	setIsModalOpen,
}: {
	selectedCharge: Charge;
	setIsModalOpen: (isOpen: boolean) => void;
}) => {
	const navigate = useNavigate();
	if (!selectedCharge) return null;

	return (
		<>
			<div className="sr-only">Detalhes da fatura selecionada</div>

			<div className="mb-6 overflow-hidden rounded-lg border">
				<div className="bg-gray-50 p-4">
					<h3 className="mb-2 font-medium text-lg">Detalhes da Fatura</h3>

					<div className="mb-3 grid grid-cols-2 gap-4">
						<div>
							<p className="text-gray-500 text-sm">Valor</p>
							<p className="font-medium">
								{formatCurrency(selectedCharge.amount)}
							</p>
						</div>
						<div>
							<p className="text-gray-500 text-sm">Data da Fatura</p>
							<p className="font-medium">
								{formatDate(selectedCharge.dueDate)}
							</p>
						</div>
					</div>

					<div className="mb-3 grid grid-cols-2 gap-4">
						<div>
							<p className="text-gray-500 text-sm">Status da Fatura</p>
							<div className="mt-1">
								<StatusBadge status={selectedCharge.status} />
							</div>
						</div>
						<div>
							{selectedCharge.paymentDate && (
								<>
									<p className="text-gray-500 text-sm">Data do Pagamento</p>
									<p className="font-medium">
										{formatDate(selectedCharge.paymentDate)}
									</p>
								</>
							)}
							{selectedCharge.paymentMethod === "boleto" &&
								selectedCharge.dueDate && (
									<>
										<p className="text-gray-500 text-sm">Data de Vencimento</p>
										<p className="font-medium">
											{formatDate(selectedCharge.dueDate)}
										</p>
									</>
								)}
						</div>
					</div>
				</div>

				<div className="border-t p-4">
					<h4 className="mb-2 font-medium">Forma de pagamento</h4>
					<div className="flex items-center">
						<PaymentMethodDisplay method={selectedCharge.paymentMethod} />
					</div>

					{selectedCharge.paymentMethod === "credit_card" &&
						selectedCharge.status === "pendente" &&
						selectedCharge.failureReason && (
							<div className="mt-3 rounded bg-red-50 p-2 text-red-700 text-sm">
								<AlertCircleIcon className="mr-1 inline h-4 w-4" />
								<span>Falha no pagamento: {selectedCharge.failureReason}</span>
							</div>
						)}

					<div className="mt-3 flex flex-wrap gap-2">
						{selectedCharge.receiptUrl && (
							<Button
								size="sm"
								variant="outline"
								asChild
							>
								<a
									href={selectedCharge.receiptUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<FileTextIcon className="mr-1 h-4 w-4" /> Ver comprovante
								</a>
							</Button>
						)}

						{selectedCharge.paymentMethod === "boleto" &&
							selectedCharge.documentUrl && (
								<Button
									size="sm"
									variant="outline"
									asChild
								>
									<a
										href={selectedCharge.documentUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										<DownloadIcon className="mr-1 h-4 w-4" /> Baixar boleto
									</a>
								</Button>
							)}
					</div>
				</div>
			</div>

			<div className="overflow-hidden rounded-lg border">
				<div className="bg-gray-50 p-4">
					<h3 className="mb-2 font-medium text-lg">Informações do Pedido</h3>

					<div className="mb-3 grid grid-cols-2 gap-4">
						<div>
							<p className="text-gray-500 text-sm">Número do pedido</p>
							<p className="font-medium">
								<Button
									variant="link"
									className="h-auto p-0 font-medium text-blue-700"
									onClick={() => {
										navigate(`/orders/${selectedCharge.orderId}`);
										setIsModalOpen(false);
									}}
								>
									#{selectedCharge.orderId}
								</Button>
							</p>
						</div>
						<div>
							<p className="text-gray-500 text-sm">Status do Pedido</p>
							<div className="mt-1">
								<OrderStatusBadge status={selectedCharge.orderDetails.status} />
							</div>
						</div>
					</div>
				</div>

				<div className="border-t">
					<h4 className="border-b bg-gray-50 p-3 font-medium">
						Produtos do Pedido
					</h4>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Produto</TableHead>
								<TableHead className="text-right">Valor</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{selectedCharge.products?.map(product => (
								<TableRow key={product.name}>
									<TableCell>{product.name}</TableCell>
									<TableCell className="text-right">
										{formatCurrency(product.price)}
									</TableCell>
								</TableRow>
							))}
							{(!selectedCharge.products ||
								selectedCharge.products.length === 0) && (
								<TableRow>
									<TableCell
										colSpan={2}
										className="py-4 text-center text-gray-500"
									>
										Nenhum produto encontrado
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	);
};
