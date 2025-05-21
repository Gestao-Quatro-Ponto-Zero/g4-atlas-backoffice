
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Eye, FileText, Download, Receipt, CreditCard, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockOrders, mockCharges } from '@/data/mockData';

// Enhanced mock data structure with orderId field to establish relationship
const mockChargesWithProducts = mockCharges.map(charge => {
  // Find corresponding order
  const relatedOrder = mockOrders.find(order => order.id === charge.orderId);
  
  return {
    ...charge,
    products: relatedOrder?.products || [],
    orderDetails: {
      orderNumber: charge.orderId,
      status: relatedOrder?.status === 'approved' ? 'aprovado' : 
              relatedOrder?.status === 'pending' ? 'pendente' : 
              relatedOrder?.status === 'denied' ? 'recusado' : 'cancelado',
      items: relatedOrder?.products || []
    }
  };
});

const Contas = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchParams] = useSearchParams();
  const orderFilter = searchParams.get('order');
  const location = useLocation();
  
  // Set the activeTab to 'all' when orderFilter changes
  useEffect(() => {
    if (orderFilter) {
      setActiveTab('all');
    }
  }, [orderFilter]);

  const getFilteredCharges = (statusFilter) => {
    // First apply the order filter, if present
    let charges = [...mockChargesWithProducts];
    
    if (orderFilter) {
      charges = charges.filter(charge => charge.orderId === orderFilter);
    }
    
    // Then apply status filter
    if (statusFilter === 'all') {
      return charges.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    }
    if (statusFilter === 'pago') return charges.filter(charge => charge.status === 'pago');
    if (statusFilter === 'pendente') return charges.filter(charge => charge.status === 'pendente');
    if (statusFilter === 'vencido') return charges.filter(charge => charge.status === 'vencido');
    
    return charges;
  };

  // Count payments by status for badges
  const pendingPaymentsCount = getFilteredCharges('pendente').length;
  const overduePaymentsCount = getFilteredCharges('vencido').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pago':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pago</span>;
      case 'pendente':
        return <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">À vencer</span>;
      case 'vencido':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Vencido</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case 'aprovado':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Aprovado</span>;
      case 'pendente':
        return <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Pendente</span>;
      case 'recusado':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Recusado</span>;
      case 'cancelado':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Cancelado</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'credit_card':
        return (
          <div className="flex items-center">
            <CreditCard className={`h-4 w-4 mr-1 text-blue-600 ${isMobile ? 'hidden' : 'inline'}`} />
            <span>Cartão de Crédito</span>
          </div>
        );
      case 'pix':
        return (
          <div className="flex items-center">
            <Receipt className={`h-4 w-4 mr-1 text-green-600 ${isMobile ? 'hidden' : 'inline'}`} />
            <span>PIX</span>
          </div>
        );
      case 'boleto':
        return (
          <div className="flex items-center">
            <FileText className={`h-4 w-4 mr-1 text-gray-600 ${isMobile ? 'hidden' : 'inline'}`} />
            <span>Boleto</span>
          </div>
        );
      default:
        return method;
    }
  };

  // Helper to display products summary
  const getProductsDisplay = (products) => {
    if (!products || products.length === 0) {
      return <span className="text-gray-500 italic">Sem produtos</span>;
    }
    
    return (
      <div>
        <span className="font-medium">{products[0].name}</span>
        {products.length > 1 && (
          <div className="text-xs text-gray-500 mt-1">
            + {products.length - 1} {products.length - 1 === 1 ? 'produto' : 'produtos'}
          </div>
        )}
      </div>
    );
  };

  const handleOpenModal = (charge) => {
    setSelectedCharge(charge);
    setIsModalOpen(true);
  };

  // Handle order ID click to navigate to order details
  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const renderChargesList = (filteredCharges) => (
    <Card className="max-w-full overflow-hidden">
      <CardContent className="p-0">
        {orderFilter && (
          <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-blue-800">Filtrando pelo pedido: #{orderFilter}</h3>
              <p className="text-sm text-blue-600">
                {filteredCharges.length} pagamento(s) encontrado(s)
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => {
              // Remove the order filter from the URL without navigating
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.delete('order');
              window.history.pushState({}, '', `${location.pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`);
              window.location.reload(); // Simple way to refresh with new URL
            }}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para todos
            </Button>
          </div>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Pedido</TableHead>
                <TableHead className="whitespace-nowrap">Data</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell whitespace-nowrap" : "whitespace-nowrap"}>Produtos</TableHead>
                <TableHead className="whitespace-nowrap">Valor</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell whitespace-nowrap" : "whitespace-nowrap"}>Forma de Pagamento</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCharges.map((charge) => (
                <TableRow 
                  key={charge.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleOpenModal(charge)}
                >
                  <TableCell className="font-medium text-blue-700">
                    <button 
                      className="hover:underline focus:outline-none" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(charge.orderId);
                      }}
                    >
                      #{charge.orderId}
                    </button>
                  </TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{formatDate(charge.dueDate)}</TableCell>
                  <TableCell className={isMobile ? "hidden md:table-cell" : ""}>
                    {getProductsDisplay(charge.products)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{formatCurrency(charge.amount)}</TableCell>
                  <TableCell className={isMobile ? "hidden md:table-cell" : ""}>{getPaymentMethodDisplay(charge.paymentMethod)}</TableCell>
                  <TableCell className="whitespace-nowrap">{getStatusBadge(charge.status)}</TableCell>
                </TableRow>
              ))}
              {filteredCharges.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    {orderFilter 
                      ? `Nenhuma fatura encontrada para o pedido #${orderFilter}` 
                      : 'Nenhuma fatura encontrada para este filtro'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  const renderModalContent = () => {
    if (!selectedCharge) return null;
    
    return (
      <>
        <DialogDescription className="sr-only">Detalhes da fatura selecionada</DialogDescription>
        
        <div className="border rounded-lg overflow-hidden mb-6">
          <div className="bg-gray-50 p-4">
            <h3 className="text-lg font-medium mb-2">Detalhes da Fatura</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">Valor</p>
                <p className="font-medium">{formatCurrency(selectedCharge.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data da Fatura</p>
                <p className="font-medium">{formatDate(selectedCharge.dueDate)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">Status da Fatura</p>
                <div className="mt-1">{getStatusBadge(selectedCharge.status)}</div>
              </div>
              <div>
                {selectedCharge.paymentDate && (
                  <>
                    <p className="text-sm text-gray-500">Data do Pagamento</p>
                    <p className="font-medium">{formatDate(selectedCharge.paymentDate)}</p>
                  </>
                )}
                {selectedCharge.paymentMethod === 'boleto' && selectedCharge.dueDate && (
                  <>
                    <p className="text-sm text-gray-500">Data de Vencimento</p>
                    <p className="font-medium">{formatDate(selectedCharge.dueDate)}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t p-4">
            <h4 className="font-medium mb-2">Forma de pagamento</h4>
            <div className="flex items-center">
              {getPaymentMethodDisplay(selectedCharge.paymentMethod)}
            </div>
            
            {selectedCharge.paymentMethod === 'credit_card' && selectedCharge.status === 'pendente' && selectedCharge.failureReason && (
              <div className="mt-3 p-2 bg-red-50 text-red-700 text-sm rounded">
                <AlertCircle className="inline h-4 w-4 mr-1" />
                <span>Falha no pagamento: {selectedCharge.failureReason}</span>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCharge.receiptUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a href={selectedCharge.receiptUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-1" /> Ver comprovante
                  </a>
                </Button>
              )}
              
              {selectedCharge.paymentMethod === 'boleto' && selectedCharge.documentUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a href={selectedCharge.documentUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-1" /> Baixar boleto
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4">
            <h3 className="text-lg font-medium mb-2">Informações do Pedido</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">Número do pedido</p>
                <p className="font-medium">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-medium text-blue-700" 
                    onClick={() => {
                      handleOrderClick(selectedCharge.orderId);
                      setIsModalOpen(false);
                    }}
                  >
                    #{selectedCharge.orderId}
                  </Button>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status do Pedido</p>
                <div className="mt-1">{getOrderStatusBadge(selectedCharge.orderDetails.status)}</div>
              </div>
            </div>
          </div>
          
          <div className="border-t">
            <h4 className="p-3 font-medium border-b bg-gray-50">Produtos do Pedido</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCharge.products && selectedCharge.products.map((product, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                  </TableRow>
                ))}
                {(!selectedCharge.products || selectedCharge.products.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-gray-500 py-4">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="w-full max-w-full px-2 sm:px-0 mx-auto overflow-hidden" style={{ maxWidth: "900px" }}>
        <div className="mb-5 text-left">
          <h1 className="text-2xl font-bold sm:text-3xl">Meus Pagamentos</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Visualize todos os seus pagamentos
            {orderFilter && <span className="font-medium"> - Pedido #{orderFilter}</span>}
          </p>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pago">Pagos</TabsTrigger>
            <TabsTrigger value="pendente" className="relative">
              À vencer
              {pendingPaymentsCount > 0 && (
                <Badge variant="secondary" className="ml-1 bg-amber-100 text-amber-800 hover:bg-amber-100">
                  {pendingPaymentsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="vencido" 
              className={`relative ${overduePaymentsCount > 0 ? 'bg-red-50 border-b-2 border-red-500 font-semibold text-red-700 hover:text-red-800 hover:bg-red-100' : ''}`}
            >
              Vencidos
              {overduePaymentsCount > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {overduePaymentsCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {renderChargesList(getFilteredCharges('all'))}
          </TabsContent>
          
          <TabsContent value="pago" className="mt-4">
            {renderChargesList(getFilteredCharges('pago'))}
          </TabsContent>
          
          <TabsContent value="pendente" className="mt-4">
            {renderChargesList(getFilteredCharges('pendente'))}
          </TabsContent>
          
          <TabsContent value="vencido" className="mt-4">
            {renderChargesList(getFilteredCharges('vencido'))}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Pagamento</DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Contas;
