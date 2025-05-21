import React, { useState } from 'react';
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
import { Eye, FileText, Download, Receipt, CreditCard, AlertCircle } from 'lucide-react';
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

const mockCharges = [
  {
    id: 'ch_1',
    date: new Date(2025, 2, 15),
    description: 'Curso de Desenvolvimento Web',
    amount: 1299.00,
    status: 'pago',
    method: 'credit_card',
    paymentDate: new Date(2025, 2, 15),
    receiptUrl: '#',
    orderDetails: {
      orderNumber: 'ORD123456',
      status: 'aprovado',
      items: [
        { name: 'Curso de Desenvolvimento Web', price: 1299.00 }
      ]
    }
  },
  {
    id: 'ch_2',
    date: new Date(2025, 2, 10),
    description: 'Curso de Inglês Básico',
    amount: 899.00,
    status: 'pago',
    method: 'pix',
    paymentDate: new Date(2025, 2, 10),
    receiptUrl: '#',
    orderDetails: {
      orderNumber: 'ORD123457',
      status: 'aprovado',
      items: [
        { name: 'Curso de Inglês Básico', price: 899.00 }
      ]
    }
  },
  {
    id: 'ch_3',
    date: new Date(2025, 3, 5),
    description: 'Curso de Marketing Digital',
    amount: 1499.00,
    status: 'pendente',
    method: 'boleto',
    dueDate: new Date(2025, 3, 15),
    boletoUrl: '#',
    orderDetails: {
      orderNumber: 'ORD123458',
      status: 'pendente',
      items: [
        { name: 'Curso de Marketing Digital', price: 1499.00 }
      ]
    }
  },
  {
    id: 'ch_4',
    date: new Date(2025, 1, 25),
    description: 'Curso de Excel Avançado',
    amount: 799.00,
    status: 'pendente',
    method: 'credit_card',
    failureReason: 'Cartão expirado',
    orderDetails: {
      orderNumber: 'ORD123459',
      status: 'recusado',
      items: [
        { name: 'Curso de Excel Avançado', price: 799.00 }
      ]
    }
  },
  {
    id: 'ch_5',
    date: new Date(2025, 1, 20),
    description: 'Curso de Fotografia',
    amount: 599.00,
    status: 'vencido',
    method: 'boleto',
    dueDate: new Date(2025, 2, 5),
    boletoUrl: '#',
    orderDetails: {
      orderNumber: 'ORD123460',
      status: 'cancelado',
      items: [
        { name: 'Curso de Fotografia', price: 599.00 }
      ]
    }
  }
];

const mockBoletoInstallments = [
  {
    id: 'bol_1',
    parentChargeId: 'ch_3',
    installmentNumber: 1,
    amount: 499.67,
    dueDate: new Date(2025, 3, 15),
    status: 'pending',
    boletoUrl: '#'
  },
  {
    id: 'bol_2',
    parentChargeId: 'ch_3',
    installmentNumber: 2,
    amount: 499.67,
    dueDate: new Date(2025, 4, 15),
    status: 'pending',
    boletoUrl: '#'
  },
  {
    id: 'bol_3',
    parentChargeId: 'ch_3',
    installmentNumber: 3,
    amount: 499.66,
    dueDate: new Date(2025, 5, 15),
    status: 'pending',
    boletoUrl: '#'
  }
];

const mockCreditCardPayments = [
  {
    id: 'cc_1',
    parentChargeId: 'ch_1',
    cardLastFourDigits: '4242',
    cardBrand: 'Visa',
    amount: 1299.00,
    paymentDate: new Date(2025, 2, 15),
    status: 'paid'
  }
];

const mockPixPayments = [
  {
    id: 'pix_1',
    parentChargeId: 'ch_2',
    amount: 899.00,
    paymentDate: new Date(2025, 2, 10),
    pixId: 'pix_12345678',
    status: 'paid'
  }
];

const Contas = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredCharges = (statusFilter) => {
    if (statusFilter === 'all') return [...mockCharges].sort((a, b) => b.date.getTime() - a.date.getTime());
    if (statusFilter === 'pago') return mockCharges.filter(charge => charge.status === 'pago');
    if (statusFilter === 'pendente') return mockCharges.filter(charge => charge.status === 'pendente');
    if (statusFilter === 'vencido') return mockCharges.filter(charge => charge.status === 'vencido');
    return mockCharges;
  };

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

  const handleOpenModal = (charge) => {
    setSelectedCharge(charge);
    setIsModalOpen(true);
  };

  const renderChargesList = (filteredCharges) => (
    <Card className="max-w-full overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Data</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell whitespace-nowrap" : "whitespace-nowrap"}>Descrição</TableHead>
                <TableHead className="whitespace-nowrap">Valor</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell whitespace-nowrap" : "whitespace-nowrap"}>Forma de Pagamento</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCharges.map((charge) => (
                <TableRow 
                  key={charge.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleOpenModal(charge)}
                >
                  <TableCell className="font-medium whitespace-nowrap">{formatDate(charge.date.toISOString())}</TableCell>
                  <TableCell className={isMobile ? "hidden md:table-cell" : ""}>{charge.description}</TableCell>
                  <TableCell className="whitespace-nowrap">{formatCurrency(charge.amount)}</TableCell>
                  <TableCell className={isMobile ? "hidden md:table-cell" : ""}>{getPaymentMethodDisplay(charge.method)}</TableCell>
                  <TableCell className="whitespace-nowrap">{getStatusBadge(charge.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Ver detalhes"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenModal(charge);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {charge.status === 'pago' && charge.receiptUrl && (
                        <Button variant="ghost" size="sm" asChild title="Ver comprovante">
                          <a 
                            href={charge.receiptUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <FileText className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {charge.method === 'boleto' && charge.boletoUrl && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          asChild 
                          title="Baixar boleto"
                        >
                          <a 
                            href={charge.boletoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCharges.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    Nenhuma fatura encontrada para este filtro
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
                <p className="font-medium">{formatDate(selectedCharge.date.toISOString())}</p>
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
                    <p className="font-medium">{formatDate(selectedCharge.paymentDate.toISOString())}</p>
                  </>
                )}
                {selectedCharge.method === 'boleto' && selectedCharge.dueDate && (
                  <>
                    <p className="text-sm text-gray-500">Data de Vencimento</p>
                    <p className="font-medium">{formatDate(selectedCharge.dueDate.toISOString())}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t p-4">
            <h4 className="font-medium mb-2">Forma de pagamento</h4>
            <div className="flex items-center">
              {getPaymentMethodDisplay(selectedCharge.method)}
            </div>
            
            {selectedCharge.method === 'credit_card' && selectedCharge.status === 'pendente' && selectedCharge.failureReason && (
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
              
              {selectedCharge.method === 'boleto' && selectedCharge.boletoUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a href={selectedCharge.boletoUrl} target="_blank" rel="noopener noreferrer">
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
                <p className="text-sm text-gray-500">Produto</p>
                <p className="font-medium">{selectedCharge.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Número do pedido</p>
                <p className="font-medium">{selectedCharge.orderDetails.orderNumber}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Status do Pedido</p>
                <div className="mt-1">{getOrderStatusBadge(selectedCharge.orderDetails.status)}</div>
              </div>
            </div>
          </div>
          
          <div className="border-t">
            <h4 className="p-3 font-medium border-b bg-gray-50">Itens do Pedido</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCharge.orderDetails.items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                  </TableRow>
                ))}
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
          <h1 className="text-2xl font-bold sm:text-3xl">Minhas Faturas</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Visualize todas as suas faturas
          </p>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="pago">Pagas</TabsTrigger>
            <TabsTrigger value="pendente">À vencer</TabsTrigger>
            <TabsTrigger value="vencido">Vencidas</TabsTrigger>
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
            <DialogTitle>Detalhes da Fatura</DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Contas;
