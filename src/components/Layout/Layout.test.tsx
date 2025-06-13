import React from 'react';
import { render, screen } from '../../../tests';
import Layout from './Layout';

// Mock do useAuth
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true,
  }),
}));

// Mock do useIsMobile
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with authenticated user', () => {
    render(
      <Layout>
        <div>Authenticated Content</div>
      </Layout>
    );
    
    expect(screen.getByText('Authenticated Content')).toBeInTheDocument();
  });
});