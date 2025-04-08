
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import ProfileSection from '../components/ProfileSection';
import OrderList from '../components/OrderList';
import { mockOrders } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleUser, ShoppingCart, CreditCard } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Layout>
      {!isAuthenticated ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-center mb-8">
            <div className="flex justify-center">
              <div className="text-4xl font-bold text-blue-600">G4</div>
              <div className="text-3xl ml-1">Educação</div>
            </div>
            <h1 className="text-2xl font-bold mt-4">
              Portal do Cliente
            </h1>
            <p className="text-gray-600 max-w-md mx-auto mt-2">
              Gerencie seus pedidos, acompanhe entregas e acesse seus cursos
            </p>
          </div>
          
          <LoginForm />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Bem-vindo de volta!</h1>
            <p className="text-gray-600">
              Acesse seus pedidos e gerencie suas informações
            </p>
          </div>
          
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders" className="flex items-center">
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span>Meus Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center">
                <CircleUser className="h-4 w-4 mr-2" />
                <span>Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                <span>Pagamentos</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Seus Pedidos</h2>
                <OrderList orders={mockOrders} />
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileSection />
            </TabsContent>
            
            <TabsContent value="payments">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Métodos de Pagamento</h2>
                <p className="text-gray-500">
                  Esta funcionalidade estará disponível em breve. Você poderá gerenciar seus cartões e outros métodos de pagamento.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </Layout>
  );
};

export default Index;
