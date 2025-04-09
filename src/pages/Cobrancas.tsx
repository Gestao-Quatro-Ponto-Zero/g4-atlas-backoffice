
import React from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for charges
const mockCharges = [
  {
    id: 'ch_1',
    date: new Date(2025, 2, 15),
    description: 'Curso de Desenvolvimento Web',
    amount: 1299.00,
    status: 'paid',
    method: 'credit_card',
    paymentDate: new Date(2025, 2, 15),
    receiptUrl: '#'
  },
  {
    id: 'ch_2',
    date: new Date(2025, 2, 10),
    description: 'Curso de Inglês Básico',
    amount: 899.00,
    status: 'paid',
    method: 'pix',
    paymentDate: new Date(2025, 2, 10),
    receiptUrl: '#'
  },
  {
    id: 'ch_3',
    date: new Date(2025, 3, 5),
    description: 'Curso de Marketing Digital',
    amount: 1499.00,
    status: 'pending',
    method: 'boleto',
    dueDate: new Date(2025, 3, 15),
    boletoUrl: '#'
  },
  {
    id: 'ch_4',
    date: new Date(2025, 1, 25),
    description: 'Curso de Excel Avançado',
    amount: 799.00,
    status: 'failed',
    method: 'credit_card',
    failureReason: 'Cartão expirado'
  },
  {
    id: 'ch_5',
    date: new Date(2025, 1, 20),
    description: 'Curso de Fotografia',
    amount: 599.00,
    status: 'expired',
    method: 'boleto',
    dueDate: new Date(2025, 2, 5),
    boletoUrl: '#'
  }
];

// Mock data for boleto installments
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

// Mock data for credit card payments
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

// Mock data for PIX payments
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

const Cobrancas = () => {
  const { isAuthenticated, isLoading } = useAuth();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Pago</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Pendente</span>;
      case 'failed':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Falhou</span>;
      case 'expired':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Vencido</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'credit_card':
        return (
          <div className="flex items-center">
            <CreditCard className="h-4 w-4 mr-1 text-blue-600" />
            <span>Cartão de Crédito</span>
          </div>
        );
      case 'pix':
        return (
          <div className="flex items-center">
            <Receipt className="h-4 w-4 mr-1 text-green-600" />
            <span>PIX</span>
          </div>
        );
      case 'boleto':
        return (
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1 text-gray-600" />
            <span>Boleto</span>
          </div>
        );
      default:
        return method;
    }
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
      <div className="w-full mx-auto px-2 sm:px-0" style={{ maxWidth: "900px" }}>
        <div className="mb-5 text-left">
          <h1 className="text-2xl font-bold sm:text-3xl">Minhas Cobranças</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Visualize todos os seus pagamentos e cobranças
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="boleto">Boletos</TabsTrigger>
            <TabsTrigger value="credit_card">Cartão de Crédito</TabsTrigger>
            <TabsTrigger value="pix">PIX</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Forma de Pagamento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCharges.map((charge) => (
                      <TableRow key={charge.id}>
                        <TableCell className="font-medium">{formatDate(charge.date.toISOString())}</TableCell>
                        <TableCell>{charge.description}</TableCell>
                        <TableCell>{formatCurrency(charge.amount)}</TableCell>
                        <TableCell>{getPaymentMethodDisplay(charge.method)}</TableCell>
                        <TableCell>{getStatusBadge(charge.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" title="Ver detalhes">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {charge.status === 'paid' && charge.receiptUrl && (
                              <Button variant="ghost" size="sm" asChild title="Ver comprovante">
                                <a href={charge.receiptUrl} target="_blank" rel="noopener noreferrer">
                                  <FileText className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {charge.method === 'boleto' && charge.boletoUrl && (
                              <Button variant="ghost" size="sm" asChild title="Baixar boleto">
                                <a href={charge.boletoUrl} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="boleto">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Boletos</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Parcela</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCharges
                      .filter(charge => charge.method === 'boleto')
                      .map((charge) => (
                        <React.Fragment key={charge.id}>
                          <TableRow className="bg-gray-50">
                            <TableCell colSpan={6} className="py-2">
                              <div className="font-medium">{charge.description}</div>
                              <div className="text-xs text-gray-500">Valor total: {formatCurrency(charge.amount)}</div>
                            </TableCell>
                          </TableRow>
                          {mockBoletoInstallments
                            .filter(installment => installment.parentChargeId === charge.id)
                            .map((installment) => (
                              <TableRow key={installment.id}>
                                <TableCell>{formatDate(installment.dueDate.toISOString())}</TableCell>
                                <TableCell>{charge.description}</TableCell>
                                <TableCell>{installment.installmentNumber}/3</TableCell>
                                <TableCell>{formatCurrency(installment.amount)}</TableCell>
                                <TableCell>{getStatusBadge(installment.status)}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm" asChild title="Baixar boleto">
                                      <a href={installment.boletoUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="h-4 w-4" />
                                      </a>
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </React.Fragment>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="credit_card">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Pagamentos com Cartão de Crédito</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data de Pagamento</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Cartão</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCreditCardPayments.map((payment) => {
                      const parentCharge = mockCharges.find(charge => charge.id === payment.parentChargeId);
                      return (
                        <TableRow key={payment.id}>
                          <TableCell>{formatDate(payment.paymentDate.toISOString())}</TableCell>
                          <TableCell>{parentCharge?.description || 'N/A'}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium mr-1">{payment.cardBrand}</span>
                              <span className="text-gray-600">•••• {payment.cardLastFourDigits}</span>
                            </div>
                          </TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" title="Ver detalhes">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {parentCharge?.receiptUrl && (
                                <Button variant="ghost" size="sm" asChild title="Ver comprovante">
                                  <a href={parentCharge.receiptUrl} target="_blank" rel="noopener noreferrer">
                                    <FileText className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pix">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">Pagamentos com PIX</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data de Pagamento</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Identificador PIX</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPixPayments.map((payment) => {
                      const parentCharge = mockCharges.find(charge => charge.id === payment.parentChargeId);
                      return (
                        <TableRow key={payment.id}>
                          <TableCell>{formatDate(payment.paymentDate.toISOString())}</TableCell>
                          <TableCell>{parentCharge?.description || 'N/A'}</TableCell>
                          <TableCell>
                            <span className="font-mono text-xs">{payment.pixId}</span>
                          </TableCell>
                          <TableCell>{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" title="Ver detalhes">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {parentCharge?.receiptUrl && (
                                <Button variant="ghost" size="sm" asChild title="Ver comprovante">
                                  <a href={parentCharge.receiptUrl} target="_blank" rel="noopener noreferrer">
                                    <FileText className="h-4 w-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Cobrancas;
