import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Contract, Order } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { ArrowLeftIcon, EyeIcon, FileTextIcon } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import { StatusBadge } from "./StatusBadge";

export const ContractsList = ({
	filteredContracts,
	getAssociatedOrder,
	handleOpenModal,
	getContractTypeDisplay,
}: {
	filteredContracts: Contract[];
	getAssociatedOrder: (orderId: string) => Order | undefined;
	handleOpenModal: (contract: Contract) => void;
	getContractTypeDisplay: (type: string) => string;
}) => {
	const [searchParams] = useSearchParams();
	const orderFilter = searchParams.get("order");
	const location = useLocation();

	return (
		<Card className="max-w-full overflow-hidden">
			<CardContent className="p-0">
				{orderFilter && (
					<div className="flex items-center justify-between border-blue-100 border-b bg-blue-50 p-4">
						<div>
							<h3 className="font-medium text-blue-800">
								Filtrando pelo pedido: #{orderFilter}
							</h3>
							<p className="text-blue-600 text-sm">
								{filteredContracts.length} contrato(s) encontrado(s)
							</p>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								const newSearchParams = new URLSearchParams(searchParams);
								newSearchParams.delete("order");
								window.history.pushState(
									{},
									"",
									`${location.pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ""}`,
								);
								window.location.reload();
							}}
						>
							<ArrowLeftIcon className="mr-1 h-4 w-4" />
							Voltar para todos
						</Button>
					</div>
				)}
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="whitespace-nowrap">
									Data de Início
								</TableHead>
								<TableHead className="hidden whitespace-nowrap md:table-cell">
									Tipo
								</TableHead>
								<TableHead className="whitespace-nowrap">Status</TableHead>
								<TableHead className="hidden whitespace-nowrap md:table-cell">
									Pedido
								</TableHead>
								<TableHead className="hidden whitespace-nowrap md:table-cell">
									Valor
								</TableHead>
								<TableHead className="whitespace-nowrap text-right">
									Ações
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredContracts.map(contract => {
								const associatedOrder = getAssociatedOrder(contract.orderId);
								return (
									<TableRow
										key={contract.id}
										className="cursor-pointer hover:bg-gray-50"
										onClick={() => handleOpenModal(contract)}
									>
										<TableCell className="whitespace-nowrap font-medium">
											{formatDate(contract.startDate)}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{getContractTypeDisplay(contract.type)}
										</TableCell>
										<TableCell className="whitespace-nowrap">
											<StatusBadge status={contract.status} />
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{contract.orderId && (
												<span className="font-medium text-sm">
													#{contract.orderId}
												</span>
											)}
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{associatedOrder && (
												<span>{formatCurrency(associatedOrder.price)}</span>
											)}
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button
													variant="ghost"
													size="sm"
													title="Ver detalhes"
													onClick={e => {
														e.stopPropagation();
														handleOpenModal(contract);
													}}
												>
													<EyeIcon className="h-4 w-4" />
												</Button>
												{contract.documentUrl && (
													<Button
														variant="ghost"
														size="sm"
														asChild
														title="Ver documento"
													>
														<a
															href={contract.documentUrl}
															target="_blank"
															rel="noopener noreferrer"
															onClick={e => e.stopPropagation()}
														>
															<FileTextIcon className="h-4 w-4" />
														</a>
													</Button>
												)}
											</div>
										</TableCell>
									</TableRow>
								);
							})}
							{filteredContracts.length === 0 && (
								<TableRow>
									<TableCell
										colSpan={6}
										className="py-6 text-center text-gray-500"
									>
										{orderFilter
											? `Nenhum contrato encontrado para o pedido #${orderFilter}`
											: "Nenhum contrato encontrado para este filtro"}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
};
