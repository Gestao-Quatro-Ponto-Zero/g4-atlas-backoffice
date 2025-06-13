import React from 'react';
import { render, screen } from '../../../tests';
import SideMenu from './SideMenu';

// Mock do useAuth
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'João Silva',
      email: 'joao@example.com',
    },
    logout: vi.fn(),
  }),
}));

// Mock do useIsMobile
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

describe('SideMenu', () => {
  it('renders user information', () => {
    render(<SideMenu />);
    
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<SideMenu />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Usuários')).toBeInTheDocument();
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Ajuda')).toBeInTheDocument();
  });

  it('renders help button', () => {
    render(<SideMenu />);
    
    expect(screen.getByText('Ajuda')).toBeInTheDocument();
  });
});