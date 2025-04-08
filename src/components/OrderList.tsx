
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
      <div className="text-center py-12">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum pedido encontrado</h3>
        <p className="mt-1 text-gray-500">Você ainda não fez nenhum pedido.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
