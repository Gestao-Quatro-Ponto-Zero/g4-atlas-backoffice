
import React from 'react';
import { cn } from '@/lib/utils';
import { Order } from '@/data/mockData';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusIcon = () => {
    switch (order.status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'denied':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (order.status) {
      case 'approved':
        return 'Aprovado';
      case 'pending':
        return 'Pendente';
      case 'denied':
        return 'Recusado';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'denied':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{order.productName}</h3>
            <p className="text-gray-500 text-sm mt-1">Pedido #{order.id}</p>
          </div>
          <div className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", getStatusColor())}>
            <div className="flex items-center space-x-1">
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Data</p>
            <p className="font-medium">{formatDate(order.date)}</p>
          </div>
          <div>
            <p className="text-gray-500">Valor</p>
            <p className="font-medium">{formatCurrency(order.price)}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Forma de Pagamento</p>
            <p className="font-medium">{order.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
