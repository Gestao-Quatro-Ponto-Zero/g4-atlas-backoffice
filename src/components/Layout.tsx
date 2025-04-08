
import React from 'react';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Header />}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} G4 Educação. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
