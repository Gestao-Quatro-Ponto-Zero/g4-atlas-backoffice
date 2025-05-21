
import React from 'react';
import { Package } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/mockData';

interface ProductsTableProps {
  products: Product[];
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => (
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
        {products.map((product, index) => (
          <TableRow key={`product-row-${index}`}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <Package className="h-4 w-4 text-gray-500 mr-2" />
                {product.name}
              </div>
            </TableCell>
            <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
            <TableCell className="text-right">
              <Badge variant="outline" className="ml-auto">
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

export default ProductsTable;
