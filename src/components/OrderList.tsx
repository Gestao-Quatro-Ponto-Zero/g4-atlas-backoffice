
import React from 'react';
import OrderCard from './OrderCard';
import { Order } from '@/data/mockData';
import { ShoppingCart } from 'lucide-react';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 py-12">
        <ShoppingCart className="h-12 w-12 text-gray-400" strokeWidth={1.5} />
        <h3 className="mt-4 text-base font-medium text-gray-900">Nenhum pedido encontrado</h3>
        <p className="mt-1 text-sm text-gray-500">Você ainda não fez nenhum pedido.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
