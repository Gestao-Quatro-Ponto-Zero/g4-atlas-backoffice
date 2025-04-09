
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
    <div className="min-h-screen bg-gray-50/40">
      <div className="flex">
        {isAuthenticated && <SideMenu />}
        <div className="flex flex-col flex-grow w-full">
          {isAuthenticated && <Header />}
          <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <footer className="border-t border-gray-100 bg-white py-4 sm:py-6">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
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
    </div>
  );
};

export default Layout;
