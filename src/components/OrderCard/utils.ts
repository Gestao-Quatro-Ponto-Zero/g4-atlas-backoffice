export const getStatusText = (status: string) => {
	switch (status) {
		case "approved":
			return "Aprovado";
		case "pending":
			return "Pendente";
		case "denied":
			return "Recusado";
		default:
			return "Desconhecido";
	}
};

export const getStatusStyles = (status: string) => {
	switch (status) {
		case "approved":
			return "bg-green-50 text-green-700 border-green-100";
		case "pending":
			return "bg-amber-50 text-amber-700 border-amber-100";
		case "denied":
			return "bg-red-50 text-red-700 border-red-100";
		default:
			return "bg-gray-50 text-gray-700 border-gray-100";
	}
};

export const getContractStyle = (status: string) => {
	switch (status) {
		case "active":
			return "bg-blue-50 text-blue-700 border-blue-200";
		case "pending":
			return "bg-amber-50 text-amber-700 border-amber-200";
		case "expired":
			return "bg-gray-50 text-gray-700 border-gray-200";
		case "canceled":
			return "bg-red-50 text-red-700 border-red-200";
		default:
			return "bg-blue-50 text-blue-700 border-blue-200";
	}
};

export const getContractLabel = (status: string) => {
	switch (status) {
		case "active":
			return "Ativo";
		case "pending":
			return "Pendente de Assinatura";
		case "expired":
			return "Expirado";
		case "canceled":
			return "Cancelado";
		default:
			return "Status Desconhecido";
	}
};

export const calculateOrderTotal = (
	products: Array<{ price: number; quantity: number }>,
) => {
	return products.reduce(
		(total, product) => total + product.price * product.quantity,
		0,
	);
};
