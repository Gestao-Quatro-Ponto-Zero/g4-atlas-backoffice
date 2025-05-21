
import React from 'react';
import { Package } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { Product } from '@/data/mockData';

interface MobileProductCardProps {
  product: Product;
}

export const MobileProductCard: React.FC<MobileProductCardProps> = ({ product }) => (
  <div className="bg-white p-3 rounded-md border border-gray-100">
    <div className="flex items-center mb-2">
      <Package className="h-4 w-4 text-gray-500 mr-2" />
      <span className="text-sm font-medium flex-grow">{product.name}</span>
    </div>
    <div className="grid grid-cols-3 gap-2 text-xs">
      <div>
        <p className="text-gray-500">Valor Unit.</p>
        <p className="font-medium">{formatCurrency(product.price)}</p>
      </div>
      <div>
        <p className="text-gray-500">Quant.</p>
        <p className="font-medium">{product.quantity}</p>
      </div>
      <div>
        <p className="text-gray-500">Total</p>
        <p className="font-medium">{formatCurrency(product.price * product.quantity)}</p>
      </div>
    </div>
  </div>
);

export default MobileProductCard;
