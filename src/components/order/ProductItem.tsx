
import React from 'react';
import { Package } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface ProductItemProps {
  name: string;
  price: number;
  quantity: number;
}

export const ProductItem: React.FC<ProductItemProps> = ({ name, price, quantity }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md mb-2 last:mb-0">
    <div className="flex items-center">
      <Package className="h-4 w-4 text-gray-500 mr-2" />
      <span className="text-sm font-medium">{name}</span>
      {quantity > 1 && (
        <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
          {quantity}x
        </span>
      )}
    </div>
    <span className="text-sm">{formatCurrency(price * quantity)}</span>
  </div>
);

export default ProductItem;
