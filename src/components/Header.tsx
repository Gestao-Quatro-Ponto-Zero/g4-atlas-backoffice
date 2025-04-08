
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserCircle, ShoppingCart, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">G4</div>
            <div className="ml-1 text-lg">Educação</div>
          </a>
        </div>
        
        <div className="flex items-center space-x-4">
          <a href="/pedidos" className="flex items-center text-gray-700 hover:text-blue-600">
            <ShoppingCart className="h-5 w-5 mr-1" />
            <span className="hidden sm:inline">Meus Pedidos</span>
          </a>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <UserCircle className="h-5 w-5 text-gray-700" />
              <span className="ml-1 text-sm font-medium hidden sm:inline">{user?.name?.split(' ')[0]}</span>
            </div>
            <button 
              onClick={logout}
              className="text-gray-700 hover:text-blue-600 flex items-center"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline ml-1">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
