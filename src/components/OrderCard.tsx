
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Order, PaymentDetails } from '@/data/mockData';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  CreditCard, 
  Receipt, 
  ArrowRight,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Landmark
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);

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

  // Função para renderizar os detalhes do método de pagamento
  const renderPaymentMethod = (payment: PaymentDetails) => {
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

  const handleRetryPayment = () => {
    console.log("Tentando pagamento novamente para o pedido:", order.id);
    // Em um sistema real, aqui chamaríamos a API do Stripe ou gateway de pagamento
  };

  const renderPaymentActions = (payment: PaymentDetails) => {
    if (order.status === 'denied') {
      return (
        <div className="mt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Tentar Novamente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tentar pagamento novamente</DialogTitle>
                <DialogDescription>
                  Escolha um método de pagamento para tentar novamente.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button className="flex justify-between items-center w-full" onClick={handleRetryPayment}>
                  <div className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Cartão de Crédito</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="flex justify-between items-center w-full" onClick={handleRetryPayment}>
                  <div className="flex items-center">
                    <Receipt className="mr-2 h-4 w-4" />
                    <span>Boleto Bancário</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogTrigger asChild>
                  <Button type="button" variant="secondary">
                    Cancelar
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
    
    if (payment.receiptUrl && (order.status === 'approved' || order.status === 'pending')) {
      return (
        <div className="mt-2">
          <a 
            href={payment.receiptUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline flex items-center"
          >
            <Receipt className="h-4 w-4 mr-1" />
            Visualizar comprovante
          </a>
        </div>
      );
    }
    
    return null;
  };

  const hasMultiplePayments = order.payments.length > 1;

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

          <Collapsible
            open={isPaymentsOpen}
            onOpenChange={setIsPaymentsOpen}
            className="mt-3"
          >
            <div className="rounded-md bg-gray-50/70 p-3">
              <div className="flex justify-between items-center">
                <p className="text-xs font-medium uppercase text-gray-500">
                  Forma{hasMultiplePayments ? 's' : ''} de Pagamento
                </p>
                {hasMultiplePayments && (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                      {isPaymentsOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>

              {/* Sempre mostrar o primeiro pagamento */}
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {renderPaymentMethod(order.payments[0])}
                  </div>
                  {hasMultiplePayments && (
                    <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">
                      {((order.payments[0].amount / order.price) * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
                
                {order.status === 'denied' && order.payments[0].failureReason && (
                  <div className="mt-2 text-xs text-red-600">
                    <p className="font-medium">Motivo da recusa:</p>
                    <p>{order.payments[0].failureReason}</p>
                  </div>
                )}
                
                {renderPaymentActions(order.payments[0])}
              </div>

              {/* Mostrar pagamentos adicionais quando expandido */}
              {hasMultiplePayments && (
                <CollapsibleContent>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    {order.payments.slice(1).map((payment, index) => (
                      <div key={payment.id} className="mt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {renderPaymentMethod(payment)}
                          </div>
                          <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">
                            {((payment.amount / order.price) * 100).toFixed(0)}%
                          </span>
                        </div>
                        
                        {order.status === 'denied' && payment.failureReason && (
                          <div className="mt-2 text-xs text-red-600">
                            <p className="font-medium">Motivo da recusa:</p>
                            <p>{payment.failureReason}</p>
                          </div>
                        )}
                        
                        {renderPaymentActions(payment)}
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              )}
            </div>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
