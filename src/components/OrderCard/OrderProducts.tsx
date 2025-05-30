import type { Product } from "@/data/mockData";
import { ProductItem } from "./ProductItem";

export const OrderProducts = ({ products }: { products: Product[] }) => {
	return (
		<div className="mb-4">
			<p className="mb-2 font-medium text-gray-500 text-xs uppercase">
				Produtos
			</p>
			<div className="space-y-2">
				{products.map(product => (
					<ProductItem
						key={product.name}
						name={product.name}
						price={product.price}
						quantity={product.quantity}
					/>
				))}
			</div>
		</div>
	);
};
