
import React from 'react';
import SideMenu from './SideMenu';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50/40">
      <div className="flex w-full">
        {isAuthenticated && (
          <div className="shrink-0">
            <SideMenu />
          </div>
        )}
        <div className="flex flex-col flex-grow w-full">
          <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
