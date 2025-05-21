import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
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
import { ArrowLeft, Eye, FileText, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockOrders, Contract } from '@/data/mockData';

// Extended Contract interface that includes orderId
interface ContractWithOrderId extends Contract {
  orderId: string;
}

const Contratos = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const [selectedContract, setSelectedContract] = useState<ContractWithOrderId | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchParams] = useSearchParams();
  const orderFilter = searchParams.get('order');
  const location = useLocation();
  
  // Extract contracts from orders
  const extractContracts = () => {
    const contracts: ContractWithOrderId[] = [];
    
    mockOrders.forEach(order => {
      if (order.contract) {
        contracts.push({
          ...order.contract,
          orderId: order.id
        });
      }
    });
    
    return contracts;
  };
  
  const allContracts = extractContracts();
  
  // Set the activeTab to 'all' when orderFilter changes
  useEffect(() => {
    if (orderFilter) {
      setActiveTab('all');
    }
  }, [orderFilter]);

  const getFilteredContracts = (statusFilter: string) => {
    // First apply the order filter, if present
    let contracts = [...allContracts];
    
    if (orderFilter) {
      contracts = contracts.filter(contract => contract.orderId === orderFilter);
    }
    
    // Then apply status filter
    if (statusFilter === 'all') {
      return contracts.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }
    if (statusFilter === 'active') return contracts.filter(contract => contract.status === 'active');
    if (statusFilter === 'pending') return contracts.filter(contract => contract.status === 'pending');
    if (statusFilter === 'expired') return contracts.filter(contract => contract.status === 'expired');
    if (statusFilter === 'canceled') return contracts.filter(contract => contract.status === 'canceled');
    
    return contracts;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Ativo</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Pendente</span>;
      case 'expired':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Expirado</span>;
      case 'canceled':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Cancelado</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getContractTypeDisplay = (type: string) => {
    switch (type) {
      case 'assinatura':
        return 'Assinatura';
      case 'educacional':
        return 'Educacional';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const handleOpenModal = (contract: ContractWithOrderId) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const getAssociatedOrder = (orderId: string) => {
    return mockOrders.find(order => order.id === orderId);
  };

  const renderContractsList = (filteredContracts: ContractWithOrderId[]) => (
    <Card className="max-w-full overflow-hidden">
      <CardContent className="p-0">
        {orderFilter && (
          <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-blue-800">Filtrando pelo pedido: #{orderFilter}</h3>
              <p className="text-sm text-blue-600">
                {filteredContracts.length} contrato(s) encontrado(s)
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
                <TableHead className="whitespace-nowrap">Data de Início</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell whitespace-nowrap" : "whitespace-nowrap"}>Tipo</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell whitespace-nowrap" : "whitespace-nowrap"}>Pedido</TableHead>
                <TableHead className={isMobile ? "hidden md:table-cell whitespace-nowrap" : "whitespace-nowrap"}>Valor</TableHead>
                <TableHead className="whitespace-nowrap text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => {
                const associatedOrder = getAssociatedOrder(contract.orderId);
                return (
                  <TableRow 
                    key={contract.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleOpenModal(contract)}
                  >
                    <TableCell className="font-medium whitespace-nowrap">{formatDate(contract.startDate)}</TableCell>
                    <TableCell className={isMobile ? "hidden md:table-cell" : ""}>{getContractTypeDisplay(contract.type)}</TableCell>
                    <TableCell className="whitespace-nowrap">{getStatusBadge(contract.status)}</TableCell>
                    <TableCell className={isMobile ? "hidden md:table-cell" : ""}>
                      {contract.orderId && (
                        <span className="text-sm font-medium">#{contract.orderId}</span>
                      )}
                    </TableCell>
                    <TableCell className={isMobile ? "hidden md:table-cell whitespace-nowrap" : "whitespace-nowrap"}>
                      {associatedOrder && (
                        <span>{formatCurrency(associatedOrder.price)}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Ver detalhes"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(contract);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {contract.documentUrl && (
                          <Button variant="ghost" size="sm" asChild title="Ver documento">
                            <a 
                              href={contract.documentUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FileText className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredContracts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                    {orderFilter 
                      ? `Nenhum contrato encontrado para o pedido #${orderFilter}` 
                      : 'Nenhum contrato encontrado para este filtro'}
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
    if (!selectedContract) return null;
    
    const associatedOrder = getAssociatedOrder(selectedContract.orderId);
    
    return (
      <>
        <DialogDescription className="sr-only">Detalhes do contrato selecionado</DialogDescription>
        
        <div className="border rounded-lg overflow-hidden mb-6">
          <div className="bg-gray-50 p-4">
            <h3 className="text-lg font-medium mb-2">Detalhes do Contrato</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">ID do Contrato</p>
                <p className="font-medium">{selectedContract.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipo de Contrato</p>
                <p className="font-medium">{getContractTypeDisplay(selectedContract.type)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">Status do Contrato</p>
                <div className="mt-1">{getStatusBadge(selectedContract.status)}</div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Renovação Automática</p>
                <p className="font-medium">{selectedContract.automaticRenewal ? 'Sim' : 'Não'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-500">Data de Início</p>
                <p className="font-medium">{formatDate(selectedContract.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data de Término</p>
                <p className="font-medium">{selectedContract.endDate ? formatDate(selectedContract.endDate) : 'N/A'}</p>
              </div>
            </div>
            
            {selectedContract.description && (
              <div className="mt-3">
                <p className="text-sm text-gray-500">Descrição</p>
                <p className="text-sm mt-1">{selectedContract.description}</p>
              </div>
            )}
            
            {selectedContract.status === 'pending' && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Contrato pendente de assinatura</p>
                    <p className="text-sm text-amber-700 mt-1">Este contrato precisa ser assinado para ativar os serviços contratados.</p>
                  </div>
                </div>
                <Button className="mt-3 bg-amber-600 hover:bg-amber-700" size="sm">
                  Assinar Contrato
                </Button>
              </div>
            )}
          </div>
          
          <div className="border-t p-4">
            <h4 className="font-medium mb-2">Documentos</h4>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedContract.documentUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a href={selectedContract.documentUrl} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-1" /> Ver documento
                  </a>
                </Button>
              )}
              
              {!selectedContract.documentUrl && (
                <p className="text-sm text-gray-500">Nenhum documento disponível</p>
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
                <p className="font-medium">#{selectedContract.orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valor do Pedido</p>
                <p className="font-medium">{associatedOrder ? formatCurrency(associatedOrder.price) : 'N/A'}</p>
              </div>
            </div>
            
            <div className="mt-3">
              <Button size="sm" variant="outline" asChild>
                <a href={`/contas?order=${selectedContract.orderId}`}>
                  Ver Pagamentos Relacionados
                </a>
              </Button>
            </div>
          </div>
          
          {associatedOrder && associatedOrder.products && (
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
                  {associatedOrder.products.map((product, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(product.price)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
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
          <h1 className="text-2xl font-bold sm:text-3xl">Meus Contratos</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Visualize todos os seus contratos
            {orderFilter && <span className="font-medium"> - Pedido #{orderFilter}</span>}
          </p>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="active">Ativos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="expired">Expirados</TabsTrigger>
            <TabsTrigger value="canceled">Cancelados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            {renderContractsList(getFilteredContracts('all'))}
          </TabsContent>
          
          <TabsContent value="active" className="mt-4">
            {renderContractsList(getFilteredContracts('active'))}
          </TabsContent>
          
          <TabsContent value="pending" className="mt-4">
            {renderContractsList(getFilteredContracts('pending'))}
          </TabsContent>
          
          <TabsContent value="expired" className="mt-4">
            {renderContractsList(getFilteredContracts('expired'))}
          </TabsContent>
          
          <TabsContent value="canceled" className="mt-4">
            {renderContractsList(getFilteredContracts('canceled'))}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Contrato</DialogTitle>
          </DialogHeader>
          {renderModalContent()}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Contratos;
