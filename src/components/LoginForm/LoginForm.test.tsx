import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../tests';
import LoginForm from './LoginForm';

// Mock do useAuth
const mockLogin = vi.fn();
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

// Mock do toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form correctly', () => {
    render(<LoginForm />);
    
    expect(screen.getByText('Acesse sua conta')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    mockLogin.mockResolvedValue({});
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('shows loading state during submission', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));
    
    expect(screen.getByText('Entrando...')).toBeInTheDocument();
  });
});