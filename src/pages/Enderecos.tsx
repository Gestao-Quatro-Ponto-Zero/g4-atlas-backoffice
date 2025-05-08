
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Edit, Trash2, Check } from 'lucide-react';
import { mockAddresses } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const brazilianStates = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" }
];

const AddressCard = ({ address }) => {
  const { street, neighborhood, city, state, zipCode, isDefault } = address;
  
  return (
    <Card className="relative">
      <CardContent className="p-5">
        <div className="flex justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="font-medium">{street}</span>
            </div>
            <p className="text-sm text-gray-500">{neighborhood}</p>
            <p className="text-sm text-gray-500">{city}, {state} - {zipCode}</p>
            
            {isDefault && (
              <div className="mt-2 flex items-center space-x-1">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Padrão
                </span>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar endereço</DialogTitle>
                  <DialogDescription>
                    Atualize as informações do seu endereço
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* CEP field first */}
                  <div className="grid gap-2">
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input id="zipCode" defaultValue={zipCode} />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="street">Endereço</Label>
                    <Input id="street" defaultValue={street} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input id="neighborhood" defaultValue={neighborhood} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" defaultValue={city} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">Estado</Label>
                    <Select defaultValue={state}>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {brazilianStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="isDefault" defaultChecked={isDefault} />
                    <Label htmlFor="isDefault">Definir como endereço padrão</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button>Salvar alterações</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AddAddressDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar novo endereço
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar endereço</DialogTitle>
          <DialogDescription>
            Adicione um novo endereço à sua conta
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* CEP field first */}
          <div className="grid gap-2">
            <Label htmlFor="zipCode">CEP</Label>
            <Input id="zipCode" placeholder="CEP" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="street">Endereço</Label>
            <Input id="street" placeholder="Rua, número" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input id="neighborhood" placeholder="Bairro" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" placeholder="Cidade" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">Estado</Label>
            <Select>
              <SelectTrigger id="state">
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                {brazilianStates.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Switch id="isDefault" />
            <Label htmlFor="isDefault">Definir como endereço padrão</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar endereço</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Enderecos = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">
              Entre para acessar seus endereços
            </h1>
            <p className="text-gray-600 max-w-md mx-auto mt-2">
              Faça login para visualizar e gerenciar seus endereços
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full mx-auto px-2 sm:px-0" style={{ maxWidth: "900px" }}>
        <div className="mb-5 text-center md:text-left">
          <h1 className="text-2xl font-bold sm:text-3xl">Meus Endereços</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Gerencie seus endereços
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Endereços cadastrados</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {mockAddresses.map((address) => (
                <AddressCard 
                  key={address.id} 
                  address={address} 
                />
              ))}
            </div>
            
            <div className="mt-6">
              <AddAddressDialog />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Informações adicionais</h3>
            <p className="text-sm text-gray-500">
              Os endereços são usados apenas para fins de faturamento associados aos métodos de pagamento.
              Não enviamos correspondência física para estes endereços.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Enderecos;
