
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
            <h1 className="text-2xl font-bold">Meus Pedidos</h1>
            <p className="text-gray-600">
              Visualize e gerencie seus pedidos recentes
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <OrderList orders={mockOrders} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
