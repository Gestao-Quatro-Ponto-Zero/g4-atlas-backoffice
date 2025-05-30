import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Product } from "@/data/mockData";
import { formatCurrency } from "@/utils/formatters";
import { PackageIcon } from "lucide-react";

export const ProductsTable = ({ products }: { products: Product[] }) => {
	return (
		<div className="w-full overflow-auto">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Produto</TableHead>
						<TableHead className="text-right">Valor Unitário</TableHead>
						<TableHead className="text-right">Quantidade</TableHead>
						<TableHead className="text-right">Total</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map(product => (
						<TableRow key={product.name}>
							<TableCell className="font-medium">
								<div className="flex items-center">
									<PackageIcon className="mr-2 h-4 w-4 text-gray-500" />
									{product.name}
								</div>
							</TableCell>
							<TableCell className="text-right">
								{formatCurrency(product.price)}
							</TableCell>
							<TableCell className="text-right">
								<Badge
									variant="outline"
									className="ml-auto"
								>
									{product.quantity}
								</Badge>
							</TableCell>
							<TableCell className="text-right font-medium">
								{formatCurrency(product.price * product.quantity)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
