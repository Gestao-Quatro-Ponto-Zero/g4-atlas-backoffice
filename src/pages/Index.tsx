
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import OrderList from '../components/OrderList';
import { mockOrders } from '../data/mockData';
import OrderCard from '@/components/OrderCard';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  
  // Effect to handle order ID in URL
  useEffect(() => {
    if (id && isAuthenticated) {
      const order = mockOrders.find(order => order.id === id);
      if (order) {
        setSelectedOrder(order);
        setIsOrderDialogOpen(true);
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [id, isAuthenticated, navigate]);

  // Handle dialog close
  const handleOrderDialogClose = () => {
    setIsOrderDialogOpen(false);
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
        
        {selectedOrder && (
          <OrderCard 
            order={selectedOrder} 
            isDialogOpen={isOrderDialogOpen}
            onDialogClose={handleOrderDialogClose}
          />
        )}
      </div>
    </Layout>
  );
};

export default Index;
