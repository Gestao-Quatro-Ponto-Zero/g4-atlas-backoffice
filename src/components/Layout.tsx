
import React from 'react';
import SideMenu from './SideMenu';
import { useAuth } from '../contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50/40">
      <div className="flex w-full">
        {isAuthenticated && !isMobile && (
          <div className="shrink-0">
            <SideMenu />
          </div>
        )}
        <div className="flex flex-col flex-grow w-full">
          <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
            {isAuthenticated && isMobile && <SideMenu />}
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
