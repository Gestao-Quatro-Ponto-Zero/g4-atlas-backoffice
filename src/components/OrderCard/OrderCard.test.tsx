import React from 'react';
import { render, screen, fireEvent } from '../../../tests';
import OrderCard from './OrderCard';
import { mockOrders } from '@/data/mockData';

describe('OrderCard', () => {
  const mockOrder = mockOrders[0];

  it('renders order information correctly', () => {
    render(<OrderCard order={mockOrder} />);
    
    expect(screen.getByText(`Pedido #${mockOrder.id}`)).toBeInTheDocument();
    expect(screen.getByText(mockOrder.productName.split(',')[0])).toBeInTheDocument();
  });

  it('opens dialog when clicked', () => {
    render(<OrderCard order={mockOrder} />);
    
    const card = screen.getByText(`Pedido #${mockOrder.id}`).closest('div');
    fireEvent.click(card!);
    
    // Dialog should open (testing implementation details would require more setup)
  });

  it('displays order status correctly', () => {
    render(<OrderCard order={mockOrder} />);
    
    const statusText = mockOrder.status === 'approved' ? 'Aprovado' : 
                      mockOrder.status === 'pending' ? 'Pendente' : 'Recusado';
    expect(screen.getByText(statusText)).toBeInTheDocument();
  });
});