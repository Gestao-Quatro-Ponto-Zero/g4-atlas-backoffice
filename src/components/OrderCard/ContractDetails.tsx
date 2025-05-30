import type { Contract } from "@/data/mockData";
import { formatDate } from "@/utils/formatters";
import { CalendarIcon, FileTextIcon } from "lucide-react";
import { ContractStatusBadge } from "./ContractStatusBadge";

export const ContractDetails = ({ contract }: { contract: Contract }) => {
	return (
		<div className="rounded-md border border-gray-100 bg-white p-4">
			<div className="mb-3 flex items-start justify-between">
				<div className="flex items-center">
					<FileTextIcon className="mr-2 h-4 w-4 text-blue-600" />
					<span className="font-medium">
						{contract.type === "assinatura"
							? "Contrato de Assinatura"
							: contract.type === "educacional"
								? "Contrato Educacional"
								: "Contrato"}
					</span>
				</div>
				<div>
					<ContractStatusBadge status={contract.status} />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className="flex items-center text-sm">
					<CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
					<div>
						<span className="text-gray-600">Início:</span>
						<span className="ml-1 font-medium">
							{formatDate(contract.startDate)}
						</span>
					</div>
				</div>

				{contract.endDate && (
					<div className="flex items-center text-sm">
						<CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
						<div>
							<span className="text-gray-600">Término:</span>
							<span className="ml-1 font-medium">
								{formatDate(contract.endDate)}
							</span>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
