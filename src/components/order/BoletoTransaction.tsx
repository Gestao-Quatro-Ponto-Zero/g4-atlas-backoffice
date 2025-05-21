
import React from 'react';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Receipt, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BoletoTransactionProps {
  transaction: {
    id: string;
    dueDate: Date;
    status: string;
    amount: number;
    paidDate?: Date;
    barcode: string;
  };
  index: number;
}

export const BoletoTransaction: React.FC<BoletoTransactionProps> = ({ transaction, index }) => {
  const getBoletoStatusBadge = (status: string) => {
    switch (status) {
      case 'pago':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Pago</span>;
      case 'pendente':
        return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">Pendente</span>;
      case 'vencido':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">Vencido</span>;
      default:
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">{status}</span>;
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm border border-gray-200">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Parcela {index + 1}</span>
          {getBoletoStatusBadge(transaction.status)}
        </div>
        <span className="text-xs text-gray-600">
          Vencimento: {formatDate(transaction.dueDate)}
        </span>
        {transaction.status === 'pago' && transaction.paidDate && (
          <span className="text-xs text-green-600">
            Pago em: {formatDate(transaction.paidDate.toISOString())}
          </span>
        )}
      </div>
      <div className="text-right">
        <span className="font-medium">{formatCurrency(transaction.amount)}</span>
        <div className="flex space-x-1 mt-1">
          <Button size="sm" variant="outline" className="h-7 px-2 py-1 text-xs">
            <Receipt className="h-3 w-3 mr-1" />
            Comprovante
          </Button>
          {transaction.status === 'pendente' && (
            <Button size="sm" variant="outline" className="h-7 px-2 py-1 text-xs">
              <Download className="h-3 w-3 mr-1" />
              Boleto
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoletoTransaction;
