
import React from 'react';
import { cn } from '@/lib/utils';
import { Order } from '@/data/mockData';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Card, CardContent } from '@/components/ui/card';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getStatusIcon = () => {
    switch (order.status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'denied':
        return <XCircle className="h-4 w-4" />;
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

  const getStatusStyles = () => {
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
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardContent className="p-0">
        <div className="border-b border-gray-100 bg-gray-50/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-gray-900">{order.productName}</h3>
              <p className="text-xs text-gray-500">#{order.id}</p>
            </div>
            <div className={cn("px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5", getStatusStyles())}>
              {getStatusIcon()}
              <span>{getStatusText()}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-md bg-gray-50/70 p-3">
              <p className="text-xs font-medium uppercase text-gray-500">Data</p>
              <p className="mt-1 font-medium text-sm">{formatDate(order.date)}</p>
            </div>
            
            <div className="rounded-md bg-gray-50/70 p-3">
              <p className="text-xs font-medium uppercase text-gray-500">Valor</p>
              <p className="mt-1 font-medium text-sm">{formatCurrency(order.price)}</p>
            </div>
          </div>
          
          <div className="mt-3 rounded-md bg-gray-50/70 p-3">
            <p className="text-xs font-medium uppercase text-gray-500">Forma de Pagamento</p>
            <p className="mt-1 font-medium text-sm flex items-center">
              {order.paymentMethod}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
