
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { FileText, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for contracts
const mockActiveContracts = [
  {
    id: 'cont_1',
    name: 'Assinatura Curso Desenvolvimento Full Stack',
    startDate: new Date(2025, 1, 15),
    nextBillingDate: new Date(2025, 4, 15),
    amount: 99.90,
    status: 'active',
    type: 'monthly'
  },
  {
    id: 'cont_2',
    name: 'Assinatura Plataforma Completa',
    startDate: new Date(2025, 0, 5),
    nextBillingDate: new Date(2025, 3, 5),
    amount: 299.90,
    status: 'active',
    type: 'quarterly'
  }
];

const mockInactiveContracts = [
  {
    id: 'cont_3',
    name: 'Assinatura Curso de Inglês',
    startDate: new Date(2024, 10, 10),
    endDate: new Date(2025, 1, 10),
    amount: 49.90,
    status: 'canceled',
    type: 'monthly',
    cancelReason: 'Solicitado pelo cliente'
  },
  {
    id: 'cont_4',
    name: 'Assinatura Curso de UX/UI',
    startDate: new Date(2024, 9, 15),
    endDate: new Date(2025, 0, 15),
    amount: 89.90,
    status: 'renewed',
    type: 'monthly',
    newContractId: 'cont_5'
  }
];

const Contratos = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('active');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-100 rounded-full text-xs font-medium">Ativo</span>;
      case 'canceled':
        return <span className="px-2 py-1 bg-red-50 text-red-700 border border-red-100 rounded-full text-xs font-medium">Cancelado</span>;
      case 'renewed':
        return <span className="px-2 py-1 bg-sky-50 text-sky-700 border border-sky-100 rounded-full text-xs font-medium">Renovado</span>;
      default:
        return <span className="px-2 py-1 bg-gray-50 text-gray-700 border border-gray-100 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const formatSubscriptionType = (type: string) => {
    switch (type) {
      case 'monthly':
        return 'Mensal';
      case 'quarterly':
        return 'Trimestral';
      case 'yearly':
        return 'Anual';
      default:
        return type;
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
          <h1 className="text-2xl font-bold sm:text-3xl">Meus Contratos</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Gerencie suas assinaturas e contratos
          </p>
        </div>
        
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="inactive">Inativos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="space-y-4">
              {mockActiveContracts.map((contract) => (
                <Card key={contract.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-green-50/30 border-l-4 border-green-500 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-base">{contract.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(contract.status)}
                            <span className="text-sm text-gray-600">{formatSubscriptionType(contract.type)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatCurrency(contract.amount)}</div>
                          <div className="text-sm text-gray-600">
                            Próxima cobrança: {formatDate(contract.nextBillingDate.toISOString())}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Início: {formatDate(contract.startDate.toISOString())}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-1" />
                            Detalhes
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="inactive">
            <div className="space-y-4">
              {mockInactiveContracts.map((contract) => (
                <Card key={contract.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`p-4 border-l-4 ${
                      contract.status === 'canceled' 
                        ? 'border-red-500 bg-red-50/30'
                        : 'border-sky-500 bg-sky-50/30'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-base">{contract.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(contract.status)}
                            <span className="text-sm text-gray-600">{formatSubscriptionType(contract.type)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatCurrency(contract.amount)}</div>
                          <div className="text-sm text-gray-600">
                            Encerrado em: {formatDate(contract.endDate.toISOString())}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Início: {formatDate(contract.startDate.toISOString())}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-1" />
                            Detalhes
                          </Button>
                          {contract.status === 'canceled' && (
                            <Button size="sm" variant="outline" className="text-sky-600 border-sky-200 hover:bg-sky-50">
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Reativar
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      {contract.status === 'canceled' && contract.cancelReason && (
                        <div className="mt-3 text-sm text-gray-700 bg-red-50 p-2 rounded-md">
                          <span className="font-medium">Motivo do cancelamento:</span> {contract.cancelReason}
                        </div>
                      )}
                      
                      {contract.status === 'renewed' && contract.newContractId && (
                        <div className="mt-3 text-sm text-blue-700 bg-blue-50 p-2 rounded-md">
                          Este contrato foi renovado com novas condições.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Contratos;
