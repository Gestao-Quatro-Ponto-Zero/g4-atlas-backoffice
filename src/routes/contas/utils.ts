import { mockCharges, mockOrders } from "@/data/mockData";

// Enhanced mock data structure with orderId field to establish relationship
const mockChargesWithProducts = mockCharges.map(charge => {
	// Find corresponding order
	const relatedOrder = mockOrders.find(order => order.id === charge.orderId);

	return {
		...charge,
		products: relatedOrder?.products || [],
		orderDetails: {
			orderNumber: charge.orderId,
			status:
				relatedOrder?.status === "approved"
					? "aprovado"
					: relatedOrder?.status === "pending"
						? "pendente"
						: relatedOrder?.status === "denied"
							? "recusado"
							: "cancelado",
			items: relatedOrder?.products || [],
		},
	};
});

export const getFilteredCharges = (
	statusFilter: "all" | "pago" | "pendente" | "vencido",
	orderFilter: string,
) => {
	// First apply the order filter, if present
	let charges = [...mockChargesWithProducts];

	if (orderFilter) {
		charges = charges.filter(charge => charge.orderId === orderFilter);
	}

	// Then apply status filter
	if (statusFilter === "all") {
		return charges.sort(
			(a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
		);
	}
	if (statusFilter === "pago")
		return charges.filter(charge => charge.status === "pago");
	if (statusFilter === "pendente")
		return charges.filter(charge => charge.status === "pendente");
	if (statusFilter === "vencido")
		return charges.filter(charge => charge.status === "vencido");

	return charges;
};
