
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-end items-center h-16">
        <div className="flex items-center space-x-3">
          <button 
            onClick={logout}
            className="text-gray-700 hover:text-blue-600 flex items-center"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline ml-1">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
