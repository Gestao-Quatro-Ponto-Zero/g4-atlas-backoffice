
import React from 'react';
import { cn } from '@/lib/utils';
import { Order } from '@/data/mockData';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  CreditCard, 
  Receipt, 
  ArrowRight,
  RefreshCw
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

  // Função para renderizar os detalhes do cartão
  const renderPaymentDetails = () => {
    const { paymentDetails } = order;
    
    if (paymentDetails.method === "credit_card" && paymentDetails.cardDetails) {
      return (
        <div className="flex items-center space-x-2">
          {paymentDetails.cardDetails.brand === "mastercard" && (
            <div className="w-8 h-6 bg-[#FF5F00] rounded flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#EB001B] opacity-85 -mr-1"></div>
              <div className="w-3 h-3 rounded-full bg-[#F79E1B] opacity-85 -ml-1"></div>
            </div>
          )}
          {paymentDetails.cardDetails.brand === "visa" && (
            <div className="w-8 h-6 bg-blue-100 border border-blue-200 rounded text-blue-700 flex items-center justify-center">
              <span className="text-[10px] font-bold">VISA</span>
            </div>
          )}
          <div className="text-sm font-medium">•••• {paymentDetails.cardDetails.lastFourDigits}</div>
        </div>
      );
    } else if (paymentDetails.method === "boleto") {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-6 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
            <div className="w-6 h-3 border-t-2 border-l-2 border-r-2 border-gray-400"></div>
          </div>
          <div className="text-sm">Boleto Bancário</div>
        </div>
      );
    } else if (paymentDetails.method === "pix") {
      return (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-6 bg-green-100 border border-green-200 rounded flex items-center justify-center text-green-700">
            <span className="text-[10px] font-bold">PIX</span>
          </div>
          <div className="text-sm">Pagamento Instantâneo</div>
        </div>
      );
    }
    
    return <div className="text-sm">{order.paymentDetails.method}</div>;
  };

  const handleRetryPayment = () => {
    console.log("Tentando pagamento novamente para o pedido:", order.id);
    // Em um sistema real, aqui chamaríamos a API do Stripe ou gateway de pagamento
  };

  const renderActions = () => {
    if (order.status === 'denied') {
      return (
        <div className="mt-4">
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
    
    if (order.paymentDetails.receiptUrl && (order.status === 'approved' || order.status === 'pending')) {
      return (
        <div className="mt-4">
          <a 
            href={order.paymentDetails.receiptUrl} 
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
            <div className="mt-1 flex items-center justify-between">
              {renderPaymentDetails()}
            </div>
            
            {order.status === 'denied' && order.paymentDetails.failureReason && (
              <div className="mt-2 text-xs text-red-600">
                <p className="font-medium">Motivo da recusa:</p>
                <p>{order.paymentDetails.failureReason}</p>
              </div>
            )}
            
            {renderActions()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
