export const StatusBadge = ({ status }: { status: string }) => {
	switch (status) {
		case "pago":
			return (
				<span className="rounded-full bg-green-100 px-2 py-1 font-medium text-green-800 text-xs">
					Pago
				</span>
			);
		case "pendente":
			return (
				<span className="rounded-full bg-amber-100 px-2 py-1 font-medium text-amber-800 text-xs">
					Pendente
				</span>
			);
		case "vencido":
			return (
				<span className="rounded-full bg-red-100 px-2 py-1 font-medium text-red-800 text-xs">
					Vencido
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
