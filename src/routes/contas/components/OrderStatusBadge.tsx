export const OrderStatusBadge = ({ status }: { status: string }) => {
	switch (status) {
		case "aprovado":
			return (
				<span className="rounded-full bg-green-100 px-2 py-1 font-medium text-green-800 text-xs">
					Aprovado
				</span>
			);
		case "pendente":
			return (
				<span className="rounded-full bg-amber-100 px-2 py-1 font-medium text-amber-800 text-xs">
					Pendente
				</span>
			);
		case "recusado":
			return (
				<span className="rounded-full bg-red-100 px-2 py-1 font-medium text-red-800 text-xs">
					Recusado
				</span>
			);
		case "cancelado":
			return (
				<span className="rounded-full bg-gray-100 px-2 py-1 font-medium text-gray-800 text-xs">
					Cancelado
				</span>
			);
		default:
			return (
				<span className="rounded-full bg-gray-100 px-2 py-1 font-medium text-gray-800 text-xs">
					{status}
				</span>
			);
	}
};
