
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Order, PaymentDetails, Product } from '@/data/mockData';
import { 
  RefreshCw,
  ChevronDown,
  ChevronUp,
  CreditCard, 
  Receipt, 
  ArrowRight,
  MessageCircle,
  AlertCircle
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
import { useNavigate } from 'react-router-dom';

// Import the new components
import StatusBadge from './order/StatusBadge';
import ProductItem from './order/ProductItem';
import ProductsTable from './order/ProductsTable';
import PaymentMethod from './order/PaymentMethod';
import MobileProductCard from './order/MobileProductCard';
import BoletoTransaction from './order/BoletoTransaction';

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
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  // Use products array if available, otherwise parse from productName string
  const products = order.products || (order.productName.includes(',') 
    ? order.productName.split(',').map((name, i) => ({
        name: name.trim(),
        price: order.price / (order.productName.split(',').length), // Split price evenly for demo
        quantity: 1
      }))
    : [{ name: order.productName, price: order.price, quantity: 1 }]);
  
  const getPaymentStatusBadge = (payment: PaymentDetails) => {
    // We'll infer the payment status from the order status
    // In a real app, each payment would have its own status
    if (order.status === 'approved') {
      return <StatusBadge status="approved" variant="small" />;
    } else if (order.status === 'pending') {
      return <StatusBadge status="pending" variant="small" />;
    } else if (order.status === 'denied') {
      return <StatusBadge status="denied" variant="small" />;
    }
    
    return null;
  };

  const renderPaymentActions = (payment: PaymentDetails, index: number) => {
    // For a denied order, show the retry button only for this specific payment
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

  // Handle retry payment
  const handleRetryPayment = () => {
    console.log("Tentando pagamento novamente para o pedido:", order.id);
    // Em um sistema real, aqui chamaríamos a API do Stripe ou gateway de pagamento
  };

  const handleContactSupport = () => {
    const supportPhoneNumber = "5511942100072";
    const message = encodeURIComponent(`Olá, gostaria de ajuda com meu pedido #${order.id}`);
    window.open(`https://wa.me/${supportPhoneNumber}?text=${message}`, '_blank');
  };

  // Calculate order total from products
  const calculateOrderTotal = () => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  return (
    <>
      <Card 
        className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer border-gray-200" 
        onClick={handleOrderClick}
      >
        <CardContent className="p-0">
          <div className="border-b border-gray-100 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-gray-900">
                  {formatDate(order.date)}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  #{order.id}
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>
          </div>
          
          <div className="p-4">
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">{products[0].name}</p>
                <p className="text-sm font-medium text-gray-900">{formatCurrency(calculateOrderTotal())}</p>
              </div>
              {products.length > 1 && (
                <p className="text-xs text-gray-500">
                  + {products.length - 1} outros produtos
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {order.payments.map((payment, idx) => (
                <div key={payment.id} className="flex items-center gap-2">
                  {payment.method === "credit_card" && payment.cardDetails && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-5 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-[10px] font-bold text-gray-600">
                          {payment.cardDetails.brand.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600">
                        •••• {payment.cardDetails.lastFourDigits}
                      </span>
                    </div>
                  )}
                  {payment.method === "pix" && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-8 h-5 bg-green-100 rounded flex items-center justify-center">
                        <Smartphone className="w-3 h-3 text-green-700" />
                      </div>
                      <span className="text-xs text-gray-600">PIX</span>
                    </div>
                  )}
                  {idx < order.payments.length - 1 && (
                    <span className="text-gray-300">•</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold">Pedido #{order.id}</span>
                <span className="ml-2">
                  <StatusBadge status={order.status} variant="small" />
                </span>
              </div>
            </DialogTitle>
            <DialogDescription className="pt-2 pb-0">
              Realizado em {formatDate(order.date)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            {/* Products section with detailed table in dialog */}
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-semibold">Detalhes dos Produtos</h3>
              </div>
              <div className="p-4">
                {/* Desktop view - Table format */}
                <div className="hidden md:block">
                  <ProductsTable products={products} />
                </div>
                
                {/* Mobile view - Cards format */}
                <div className="md:hidden space-y-3">
                  {products.map((product, idx) => (
                    <MobileProductCard key={`mobile-product-${idx}`} product={product} />
                  ))}
                </div>
                
                {/* Order summary with total */}
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-medium">Total do pedido:</span>
                  <span className="text-lg font-bold">{formatCurrency(calculateOrderTotal())}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold mb-3">Detalhes do Pagamento</h3>
              
              {/* Add warning message for declined orders */}
              {order.status === 'denied' && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Pagamento recusado</p>
                    <p className="text-xs text-red-700 mt-1">
                      Seu pagamento não foi aprovado. Por favor, verifique os dados do cartão ou escolha outra forma de pagamento.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="grid gap-4">
                {order.payments.map((payment, idx) => (
                  <div key={payment.id} className="bg-white p-3 rounded-md border border-gray-100">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <PaymentMethod payment={payment} />
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="text-sm font-medium">{formatCurrency(payment.amount)}</div>
                        <div className="flex flex-wrap gap-1 mt-1 justify-end">
                          {hasMultiplePayments && (
                            <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-100 rounded-full">
                              {((payment.amount / calculateOrderTotal()) * 100).toFixed(0)}%
                            </span>
                          )}
                          {/* Show payment status badge */}
                          {getPaymentStatusBadge(payment)}
                        </div>
                      </div>
                    </div>
                    {renderPaymentActions(payment, idx)}
                  </div>
                ))}
              </div>
            </div>
            
            {hasBoletoPayment && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold mb-3">Cobranças</h3>
                <div className="space-y-3">
                  {mockBoletoTransactions.map((transaction, index) => (
                    <BoletoTransaction 
                      key={transaction.id} 
                      transaction={transaction} 
                      index={index}
                    />
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
                <MessageCircle className="mr-2 h-4 w-4" />
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
