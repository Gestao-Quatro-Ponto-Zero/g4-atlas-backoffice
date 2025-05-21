
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import OrderList from '../components/OrderList';
import { mockOrders } from '../data/mockData';
import OrderCard from '@/components/OrderCard';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { id } = useParams(); // Get the order ID from URL params
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  
  // Effect to handle order ID in URL
  useEffect(() => {
    if (id && isAuthenticated) {
      // Find the order with the matching ID
      const order = mockOrders.find(order => order.id === id);
      if (order) {
        setSelectedOrder(order);
        setIsOrderDialogOpen(true);
      } else {
        // If order not found, redirect to home
        navigate('/', { replace: true });
      }
    }
  }, [id, isAuthenticated, navigate]);

  // Handle dialog close
  const handleOrderDialogClose = () => {
    setIsOrderDialogOpen(false);
    // Reset URL without page navigation
    navigate('/', { replace: true });
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
        <div className="w-full mx-auto px-2 sm:px-0" style={{ maxWidth: "900px" }}>
          <div className="mb-5 text-center md:text-left">
            <h1 className="text-2xl font-bold sm:text-3xl">Meus Pedidos</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Visualize e gerencie suas cobranças recentes
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <OrderList orders={mockOrders} />
          </div>
          
          {/* Render OrderCard with modal open when an order is selected */}
          {selectedOrder && (
            <OrderCard 
              order={selectedOrder} 
              isDialogOpen={isOrderDialogOpen}
              onDialogClose={handleOrderDialogClose}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export default Index;
