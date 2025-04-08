
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

const ProfileSection: React.FC = () => {
  const { user } = useAuth();
  const userData = user as User;

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
