
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ProfileSection: React.FC = () => {
  const { user } = useAuth();
  const userData = user as User;
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    
    const nameParts = name.trim().split(' ');
    
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl">Dados Pessoais</CardTitle>
        <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
          <Pencil className="h-3 w-3" />
          Editar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <Avatar className="h-24 w-24 bg-[#ea384c] text-white text-xl">
            <AvatarFallback>{getInitials(userData?.name || '')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-center sm:text-left">{userData?.name}</h2>
            <p className="text-gray-500 text-center sm:text-left">{userData?.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Nome completo</p>
            <p className="text-gray-900">{userData?.name}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">E-mail</p>
            <p className="text-gray-900">{userData?.email}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">CPF</p>
            <p className="text-gray-900">{userData?.documentNumber}</p>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Telefone</p>
            <p className="text-gray-900">{userData?.phone}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
