
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import OrderList from '../components/OrderList';
import { mockOrders } from '../data/mockData';

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
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <div className="text-center mb-6">
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
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1200px" }}>
          <div className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Seus Pedidos</h1>
            <p className="text-sm text-gray-500 mt-1">
              Todas as assinaturas serão renovadas no final do atual período vigente a não ser que seja cancelada manualmente.
            </p>
          </div>
          
          <div className="space-y-4">
            <OrderList orders={mockOrders} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
