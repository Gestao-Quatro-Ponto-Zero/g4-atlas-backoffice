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
import { Eye, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for charges
const mockCharges = [
  {
    id: 'ch_1',
    date: new Date(2025, 2, 15),
    description: 'Curso de Desenvolvimento Web',
    amount: 1299.00,
    status: 'paid',
    method: 'credit_card',
    receiptUrl: '#'
  },
  {
    id: 'ch_2',
    date: new Date(2025, 2, 10),
    description: 'Curso de Inglês Básico',
    amount: 899.00,
    status: 'paid',
    method: 'pix',
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
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Cartão de Crédito';
      case 'pix':
        return 'PIX';
      case 'boleto':
        return 'Boleto';
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
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {charge.status === 'paid' && charge.receiptUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={charge.receiptUrl} target="_blank" rel="noopener noreferrer">
                              <FileText className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {charge.method === 'boleto' && charge.boletoUrl && (
                          <Button variant="ghost" size="sm" asChild>
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
      </div>
    </Layout>
  );
};

export default Cobrancas;
