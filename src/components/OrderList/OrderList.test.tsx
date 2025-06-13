import React from 'react';
import { render, screen } from '../../../tests';
import OrderList from './OrderList';
import { mockOrders } from '@/data/mockData';

describe('OrderList', () => {
  it('renders empty state when no orders', () => {
    render(<OrderList orders={[]} />);
    
    expect(screen.getByText('Nenhum pedido encontrado')).toBeInTheDocument();
    expect(screen.getByText('Você ainda não fez nenhum pedido.')).toBeInTheDocument();
  });

  it('renders list of orders', () => {
    render(<OrderList orders={mockOrders} />);
    
    // Should render order cards
    mockOrders.forEach(order => {
      expect(screen.getByText(`Pedido #${order.id}`)).toBeInTheDocument();
    });
  });

  it('renders correct number of order cards', () => {
    render(<OrderList orders={mockOrders} />);
    
    const orderCards = screen.getAllByText(/Pedido #/);
    expect(orderCards).toHaveLength(mockOrders.length);
  });
});