
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  Landmark,
  QrCode
} from 'lucide-react';
import { mockCards } from '@/data/mockData';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentMethodCard = ({ 
  brand, 
  lastFourDigits, 
  holderName, 
  type = 'credit',
  isDefault = false
}) => {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              {brand === 'mastercard' && (
                <div className="w-10 h-8 bg-[#FF5F00] rounded flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#EB001B] opacity-85 -mr-1"></div>
                  <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-85"></div>
                </div>
              )}
              {brand === 'visa' && (
                <div className="w-10 h-8 bg-blue-100 border border-blue-200 rounded text-blue-700 flex items-center justify-center">
                  <span className="font-bold text-sm">VISA</span>
                </div>
              )}
              <div>
                <p className="font-medium">•••• {lastFourDigits}</p>
                <p className="text-sm text-gray-500">{holderName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                {type === 'credit' ? 'Crédito' : 'Débito'}
              </span>
              {isDefault && (
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Padrão
                </span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AddNewPaymentMethodDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar método de pagamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar método de pagamento</DialogTitle>
          <DialogDescription>
            Adicione um novo método de pagamento à sua conta.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card">
              <CreditCard className="h-4 w-4 mr-2" />
              Cartão
            </TabsTrigger>
            <TabsTrigger value="bankslip">
              <Landmark className="h-4 w-4 mr-2" />
              Boleto
            </TabsTrigger>
            <TabsTrigger value="pix">
              <QrCode className="h-4 w-4 mr-2" />
              Pix
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="card" className="mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-2">
                <FormLabel htmlFor="cardNumber">Número do cartão</FormLabel>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormLabel htmlFor="expiry">Validade</FormLabel>
                  <Input id="expiry" placeholder="MM/AA" />
                </div>
                <div className="grid gap-2">
                  <FormLabel htmlFor="cvc">CVC</FormLabel>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <FormLabel htmlFor="cardName">Nome no cartão</FormLabel>
                <Input id="cardName" placeholder="Nome como aparece no cartão" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <FormLabel htmlFor="cardType">Tipo</FormLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit">Crédito</SelectItem>
                      <SelectItem value="debit">Débito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <FormLabel htmlFor="default">Padrão</FormLabel>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sim/Não" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Sim</SelectItem>
                      <SelectItem value="no">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bankslip" className="mt-4">
            <div className="text-center py-6">
              <Landmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">Boleto Bancário</h3>
              <p className="text-gray-500 mt-2">
                O boleto será gerado no momento da compra e enviado para seu e-mail.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="pix" className="mt-4">
            <div className="text-center py-6">
              <QrCode className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium">Pagamento via Pix</h3>
              <p className="text-gray-500 mt-2">
                O QR code Pix será gerado no momento da compra.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogTrigger>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Carteira = () => {
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
              Entre para acessar sua carteira
            </h1>
            <p className="text-gray-600 max-w-md mx-auto mt-2">
              Faça login para visualizar seus métodos de pagamento
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
          <h1 className="text-2xl font-bold sm:text-3xl">Minha Carteira</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Gerencie seus métodos de pagamento
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Métodos de pagamento</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCards.map((card) => (
                <PaymentMethodCard
                  key={card.lastFourDigits}
                  brand={card.brand}
                  lastFourDigits={card.lastFourDigits}
                  holderName={card.holderName}
                  type={card.type}
                  isDefault={card.lastFourDigits === '5367'}
                />
              ))}
            </div>
            
            <div className="mt-6">
              <AddNewPaymentMethodDialog />
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Informações adicionais</h3>
            <p className="text-sm text-gray-500">
              Os métodos de pagamento adicionados aqui estarão disponíveis para uso em suas próximas compras.
              Suas informações de pagamento são armazenadas com segurança e criptografadas.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Carteira;
