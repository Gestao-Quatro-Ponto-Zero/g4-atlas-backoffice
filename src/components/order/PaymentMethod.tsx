
import React from 'react';
import { PaymentDetails } from '@/data/mockData';
import { Landmark, Smartphone } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface PaymentMethodProps {
  payment: PaymentDetails;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({ payment }) => {
  if (payment.method === "credit_card" && payment.cardDetails) {
    return (
      <div className="flex items-center space-x-2">
        {payment.cardDetails.brand === "mastercard" && (
          <div className="w-8 h-6 bg-[#FF5F00] rounded flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-[#EB001B] opacity-85 -mr-1"></div>
            <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-85 -ml-1"></div>
          </div>
        )}
        {payment.cardDetails.brand === "visa" && (
          <div className="w-8 h-6 bg-blue-100 border border-blue-200 rounded text-blue-700 flex items-center justify-center">
            <span className="text-[10px] font-bold">VISA</span>
          </div>
        )}
        <div>
          <div className="flex items-center">
            <span className="text-sm font-medium">•••• {payment.cardDetails.lastFourDigits}</span>
            <span className="text-xs ml-2 bg-gray-100 px-2 py-0.5 rounded">
              {payment.cardDetails.type === 'credit' ? 'Crédito' : 'Débito'}
            </span>
          </div>
          {payment.installments && payment.installments > 1 && (
            <span className="text-xs text-gray-600">
              {payment.installments}x de {formatCurrency(payment.amount / payment.installments)}
            </span>
          )}
        </div>
      </div>
    );
  } else if (payment.method === "boleto") {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
          <Landmark className="w-4 h-4 text-gray-500" />
        </div>
        <div>
          <span className="text-sm">Boleto Bancário</span>
          {payment.installments && payment.installments > 1 && (
            <div className="text-xs text-gray-600">
              {payment.installments}x de {formatCurrency(payment.amount / payment.installments)}
            </div>
          )}
        </div>
      </div>
    );
  } else if (payment.method === "pix") {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-6 bg-green-100 border border-green-200 rounded flex items-center justify-center text-green-700">
          <Smartphone className="w-4 h-4" />
        </div>
        <div className="text-sm">Pix</div>
      </div>
    );
  }
  
  return <div className="text-sm">{payment.method}</div>;
};

export default PaymentMethod;
