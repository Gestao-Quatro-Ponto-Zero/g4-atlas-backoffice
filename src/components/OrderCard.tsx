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
  Landmark,
  ChevronsDown,
  ChevronsUp,
  Download,
  WhatsApp
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
  DialogClose
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNavigate } from 'react-router-dom';

interface OrderCardProps {
  order: Order;
}

const mockBoletoTransactions = [
  {
    id: "boleto_1",
    dueDate: new Date(2025, 2, 15),
    status: "pago",
    amount: 199.9,
    paidDate: new Date(2025, 2, 14),
    barcode: "34191790010104351004791020150008190990000019990"
  },
  {
    id: "boleto_2",
    dueDate: new Date(2025, 3, 15),
    status: "pendente",
    amount: 199.9,
    barcode: "34191790010104351004791020150008190990000019990"
  },
  {
    id: "boleto_3",
    dueDate: new Date(2025, 1, 15),
    status: "vencido",
    amount: 199.9,
    barcode: "34191790010104351004791020150008190990000019990"
  }
];

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isCobrancasOpen, setIsCobrancasOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const navigate = useNavigate();
  
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

  const handleContactSupport = () => {
    const supportPhoneNumber = "5511942100072";
    const message = encodeURIComponent(`Olá, gostaria de ajuda com meu pedido #${order.id}`);
    window.open(`https://wa.me/${supportPhoneNumber}?text=${message}`, '_blank');
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
  const hasBoletoPayment = order.payments.some(payment => payment.method === "boleto");

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
  
  // Handle order click
  const handleOrderClick = () => {
    setIsOrderDialogOpen(true);
    // Update URL without page navigation
    window.history.pushState({}, '', `/order/${order.id}`);
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setIsOrderDialogOpen(false);
    // Reset URL without page navigation
    window.history.pushState({}, '', '/');
  };

  return (
    <>
      <Card 
        className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer" 
        onClick={handleOrderClick}
      >
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
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold">Pedido #{order.id}</span>
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full" style={{backgroundColor: order.status === 'approved' ? '#dcfce7' : order.status === 'pending' ? '#fef9c3' : '#fee2e2'}}>
                  {getStatusText()}
                </span>
              </div>
            </DialogTitle>
            <DialogDescription className="pt-2 pb-0">
              {order.productName} - {formatDate(order.date)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold mb-3">Detalhes do Pagamento</h3>
              <div className="grid gap-4">
                {order.payments.map((payment, idx) => (
                  <div key={payment.id} className="bg-white p-3 rounded-md border border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        {renderPaymentMethod(payment)}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{formatCurrency(payment.amount)}</div>
                        {hasMultiplePayments && (
                          <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">
                            {((payment.amount / order.price) * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                    {renderPaymentActions(payment)}
                  </div>
                ))}
              </div>
            </div>
            
            {hasBoletoPayment && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-3">Cobranças</h3>
                <div className="space-y-3">
                  {mockBoletoTransactions.map((transaction, index) => (
                    <div key={transaction.id} className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm border border-gray-200">
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
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-2">
              <Button 
                onClick={handleContactSupport} 
                variant="whatsapp"
                className="w-full"
              >
                <WhatsApp className="mr-2 h-4 w-4" />
                Falar com o Suporte
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderCard;
