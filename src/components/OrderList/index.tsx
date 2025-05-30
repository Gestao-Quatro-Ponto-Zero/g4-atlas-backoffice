import { OrderCard } from "@/components/OrderCard";
import type { Order } from "@/data/mockData";
import { ShoppingCartIcon } from "lucide-react";

export const OrderList = ({ orders }: { orders: Order[] }) => {
	if (!orders.length) {
		return (
			<div className="flex flex-col items-center justify-center rounded-lg border border-gray-300 border-dashed bg-gray-50/50 py-12">
				<ShoppingCartIcon
					className="h-12 w-12 text-gray-400"
					strokeWidth={1.5}
				/>
				<h3 className="mt-4 font-medium text-base text-gray-900">
					Nenhum pedido encontrado
				</h3>
				<p className="mt-1 text-gray-500 text-sm">
					Você ainda não fez nenhum pedido.
				</p>
			</div>
		);
	}

	return (
		<div className="flex w-full flex-col gap-4 md:gap-5">
			{orders.map(order => (
				<OrderCard
					key={order.id}
					order={order}
					isDialogOpen={false}
					onDialogClose={() => {}}
				/>
			))}
		</div>
	);
};
