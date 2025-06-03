import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import type { Charge } from "@/data/mockData";
import { ModalContent } from "@/routes/cobrancas/components/ModalContent";
import { PaymentMethodDisplay } from "@/routes/cobrancas/components/PaymentMethodDisplay";
import { StatusBadge } from "@/routes/cobrancas/components/StatusBadge";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { createFileRoute } from "@tanstack/react-router";
import { DownloadIcon, EyeIcon, FileTextIcon } from "lucide-react";
import { use, useState } from "react";

const mockCharges = [
	{
		id: "ch_1",
		date: new Date(2025, 2, 15),
		description: "Curso de Desenvolvimento Web",
		amount: 1299.0,
		status: "pago",
		method: "credit_card",
		paymentDate: new Date(2025, 2, 15),
		receiptUrl: "#",
		orderDetails: {
			orderNumber: "ORD123456",
			status: "aprovado",
			items: [{ name: "Curso de Desenvolvimento Web", price: 1299.0 }],
		},
	},
	{
		id: "ch_2",
		date: new Date(2025, 2, 10),
		description: "Curso de Inglês Básico",
		amount: 899.0,
		status: "pago",
		method: "pix",
		paymentDate: new Date(2025, 2, 10),
		receiptUrl: "#",
		orderDetails: {
			orderNumber: "ORD123457",
			status: "aprovado",
			items: [{ name: "Curso de Inglês Básico", price: 899.0 }],
		},
	},
	{
		id: "ch_3",
		date: new Date(2025, 3, 5),
		description: "Curso de Marketing Digital",
		amount: 1499.0,
		status: "pendente",
		method: "boleto",
		dueDate: new Date(2025, 3, 15),
		boletoUrl: "#",
		orderDetails: {
			orderNumber: "ORD123458",
			status: "pendente",
			items: [{ name: "Curso de Marketing Digital", price: 1499.0 }],
		},
	},
	{
		id: "ch_4",
		date: new Date(2025, 1, 25),
		description: "Curso de Excel Avançado",
		amount: 799.0,
		status: "pendente",
		method: "credit_card",
		failureReason: "Cartão expirado",
		orderDetails: {
			orderNumber: "ORD123459",
			status: "recusado",
			items: [{ name: "Curso de Excel Avançado", price: 799.0 }],
		},
	},
	{
		id: "ch_5",
		date: new Date(2025, 1, 20),
		description: "Curso de Fotografia",
		amount: 599.0,
		status: "vencido",
		method: "boleto",
		dueDate: new Date(2025, 2, 5),
		boletoUrl: "#",
		orderDetails: {
			orderNumber: "ORD123460",
			status: "cancelado",
			items: [{ name: "Curso de Fotografia", price: 599.0 }],
		},
	},
];

export const Route = createFileRoute("/_layout/cobrancas")({
	component: () => {
		const { promise } = useAuth();
		const user = use(promise);
		const [selectedCharge, setSelectedCharge] = useState<Charge | null>(null);
		const [isModalOpen, setIsModalOpen] = useState(false);

		const handleOpenModal = (charge: Charge) => {
			setSelectedCharge(charge);
			setIsModalOpen(true);
		};

		if (!user) return null;

		return (
			<>
				<div
					className="mx-auto w-full max-w-full overflow-hidden px-2 md:px-0"
					style={{ maxWidth: "900px" }}
				>
					<div className="mb-5 text-left">
						<h1 className="font-bold text-2xl md:text-3xl">Minhas Cobranças</h1>
						<p className="text-gray-600 text-sm md:text-base">
							Visualize todos os seus pagamentos e cobranças
						</p>
					</div>

					<Card className="max-w-full overflow-hidden">
						<CardContent className="p-0">
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="whitespace-nowrap">Data</TableHead>
											<TableHead className="hidden whitespace-nowrap md:table-cell md:whitespace-nowrap">
												Descrição
											</TableHead>
											<TableHead className="whitespace-nowrap">Valor</TableHead>
											<TableHead className="hidden whitespace-nowrap md:table-cell md:whitespace-nowrap">
												Forma de Pagamento
											</TableHead>
											<TableHead className="whitespace-nowrap">
												Status
											</TableHead>
											<TableHead className="hidden whitespace-nowrap text-right md:table-cell">
												Ações
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{mockCharges.map(charge => (
											<TableRow
												key={charge.id}
												className="cursor-pointer hover:bg-gray-50"
												onClick={() => handleOpenModal(charge)}
											>
												<TableCell className="whitespace-nowrap font-medium">
													{formatDate(charge.date.toISOString())}
												</TableCell>
												<TableCell className="hidden md:table-cell">
													{charge.description}
												</TableCell>
												<TableCell className="whitespace-nowrap">
													{formatCurrency(charge.amount)}
												</TableCell>
												<TableCell className="hidden md:table-cell">
													<PaymentMethodDisplay method={charge.method} />
												</TableCell>
												<TableCell className="whitespace-nowrap">
													<StatusBadge status={charge.status} />
												</TableCell>

												<TableCell className="hidden text-right md:table-cell">
													<div className="flex justify-end gap-2">
														<Button
															variant="ghost"
															size="sm"
															title="Ver detalhes"
															onClick={e => {
																e.stopPropagation();
																handleOpenModal(charge);
															}}
														>
															<EyeIcon className="h-4 w-4" />
														</Button>
														{charge.status === "pago" && charge.receiptUrl && (
															<Button
																variant="ghost"
																size="sm"
																asChild
																title="Ver comprovante"
															>
																<a
																	href={charge.receiptUrl}
																	target="_blank"
																	rel="noopener noreferrer"
																	onClick={e => e.stopPropagation()}
																>
																	<FileTextIcon className="h-4 w-4" />
																</a>
															</Button>
														)}
														{charge.method === "boleto" && charge.boletoUrl && (
															<Button
																variant="ghost"
																size="sm"
																asChild
																title="Baixar boleto"
															>
																<a
																	href={charge.boletoUrl}
																	target="_blank"
																	rel="noopener noreferrer"
																	onClick={e => e.stopPropagation()}
																>
																	<DownloadIcon className="h-4 w-4" />
																</a>
															</Button>
														)}
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</div>

				<Dialog
					open={isModalOpen}
					onOpenChange={setIsModalOpen}
				>
					<DialogContent className="md:max-w-lg">
						<DialogHeader>
							<DialogTitle>Detalhes da Cobrança</DialogTitle>
						</DialogHeader>
						<ModalContent selectedCharge={selectedCharge} />
					</DialogContent>
				</Dialog>
			</>
		);
	},
});
