
import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50/40 flex">
      {isAuthenticated && <SideMenu />}
      <div className="flex flex-col flex-grow">
        {isAuthenticated && <Header />}
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <footer className="border-t border-gray-100 bg-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center">
                <span className="font-medium text-blue-600">G4</span>
                <span className="ml-1 text-gray-700">Educação</span>
              </div>
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} G4 Educação. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
