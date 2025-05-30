export const StatusBadge = ({ status }: { status: string }) => {
	switch (status) {
		case "active":
			return (
				<span className="rounded-full bg-green-100 px-2 py-1 font-medium text-green-800 text-xs">
					Ativo
				</span>
			);
		case "pending":
			return (
				<span className="rounded-full bg-amber-100 px-2 py-1 font-medium text-amber-800 text-xs">
					Pendente
				</span>
			);
		case "expired":
			return (
				<span className="rounded-full bg-red-100 px-2 py-1 font-medium text-red-800 text-xs">
					Expirado
				</span>
			);
		case "canceled":
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
