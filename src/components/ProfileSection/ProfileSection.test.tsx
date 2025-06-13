import React from 'react';
import { render, screen, fireEvent } from '../../../tests';
import ProfileSection from './ProfileSection';

// Mock do useAuth
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      name: 'João Silva',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
    },
  }),
}));

// Mock do toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('ProfileSection', () => {
  it('renders user data correctly', () => {
    render(<ProfileSection />);
    
    expect(screen.getByText('Dados Pessoais')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
    expect(screen.getByText('(11) 99999-9999')).toBeInTheDocument();
  });

  it('opens name edit dialog when name field is clicked', () => {
    render(<ProfileSection />);
    
    const nameField = screen.getByText('João Silva').closest('div');
    fireEvent.click(nameField!);
    
    expect(screen.getByText('Atualizar nome')).toBeInTheDocument();
  });

  it('opens email edit dialog when email field is clicked', () => {
    render(<ProfileSection />);
    
    const emailField = screen.getByText('joao@example.com').closest('div');
    fireEvent.click(emailField!);
    
    expect(screen.getByText('Atualizar e-mail')).toBeInTheDocument();
  });

  it('opens phone edit dialog when phone field is clicked', () => {
    render(<ProfileSection />);
    
    const phoneField = screen.getByText('(11) 99999-9999').closest('div');
    fireEvent.click(phoneField!);
    
    expect(screen.getByText('Atualizar telefone')).toBeInTheDocument();
  });
});