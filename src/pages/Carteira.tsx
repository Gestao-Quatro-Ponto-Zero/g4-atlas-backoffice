
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { 
  CreditCard, 
  Plus, 
  Trash2,
  Check,
  MapPin,
  Edit
} from 'lucide-react';
import { mockCards, mockAddresses } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from 'react-router-dom';

const PaymentMethodCard = ({ 
  id,
  brand, 
  lastFourDigits, 
  holderName, 
  type = 'credit',
  isDefault = false,
  addressId
}) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [associatedAddress, setAssociatedAddress] = useState(null);

  // Find associated address
  useEffect(() => {
    if (addressId) {
      const address = mockAddresses.find(addr => addr.id === addressId);
      setAssociatedAddress(address);
    }
  }, [addressId]);

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
            
            {associatedAddress && (
              <div className="mt-2 border-t border-gray-100 pt-2">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-1.5" />
                  <div>
                    <p className="text-xs text-gray-600">{associatedAddress.street}</p>
                    <p className="text-xs text-gray-500">{associatedAddress.city}, {associatedAddress.state}</p>
                    <div className="flex items-center mt-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 text-xs px-2 flex items-center">
                            <Edit className="h-3 w-3 mr-1" />
                            Editar endereço
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Editar endereço de cobrança</DialogTitle>
                            <DialogDescription>
                              Atualize o endereço associado a este cartão
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 gap-2">
                              <Label htmlFor="edit-street">Endereço</Label>
                              <Input id="edit-street" defaultValue={associatedAddress.street} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="edit-neighborhood">Bairro</Label>
                                <Input id="edit-neighborhood" defaultValue={associatedAddress.neighborhood} />
                              </div>
                              <div>
                                <Label htmlFor="edit-city">Cidade</Label>
                                <Input id="edit-city" defaultValue={associatedAddress.city} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="edit-state">Estado</Label>
                                <Input id="edit-state" defaultValue={associatedAddress.state} />
                              </div>
                              <div>
                                <Label htmlFor="edit-zipcode">CEP</Label>
                                <Input id="edit-zipcode" defaultValue={associatedAddress.zipCode} />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancelar</Button>
                            <Button>Salvar alterações</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button variant="ghost" size="sm" className="h-6 text-xs px-2 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        Trocar endereço
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir método de pagamento</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este cartão? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">Excluir</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

const AddressSelection = ({ setSelectedAddress, selectedAddress }) => {
  const [useNewAddress, setUseNewAddress] = useState(false);
  
  return (
    <div className="space-y-4 mt-4">
      <h4 className="text-sm font-medium">Endereço de cobrança</h4>
      
      <RadioGroup 
        value={useNewAddress ? 'new' : 'existing'} 
        onValueChange={(value) => setUseNewAddress(value === 'new')}
      >
        <div className="flex items-start space-x-2 mb-3">
          <RadioGroupItem value="existing" id="existing" />
          <div className="grid gap-1.5">
            <label htmlFor="existing" className="text-sm font-medium">
              Usar um endereço existente
            </label>
            {!useNewAddress && (
              <Select 
                value={selectedAddress} 
                onValueChange={setSelectedAddress}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um endereço" />
                </SelectTrigger>
                <SelectContent>
                  {mockAddresses.map((address) => (
                    <SelectItem key={address.id} value={address.id}>
                      {address.street}, {address.city}/{address.state}
                      {address.isDefault && " (Padrão)"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <div className="flex justify-between mt-1">
              <Link to="/enderecos" className="text-xs text-blue-600 hover:underline">
                Gerenciar endereços
              </Link>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <RadioGroupItem value="new" id="new" />
          <div className="grid gap-1.5 w-full">
            <label htmlFor="new" className="text-sm font-medium">
              Adicionar novo endereço
            </label>
            {useNewAddress && (
              <div className="grid grid-cols-1 gap-4 mt-2">
                <Input placeholder="Endereço (rua, número)" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Bairro" />
                  <Input placeholder="Cidade" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Estado" />
                  <Input placeholder="CEP" />
                </div>
              </div>
            )}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

const AddNewPaymentMethodDialog = () => {
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id);
  const form = useForm({
    defaultValues: {
      cardNumber: "",
      expiry: "",
      cvc: "",
      cardName: "",
      cardType: "credit",
      isDefault: "no"
    }
  });

  const onSubmit = (data) => {
    console.log("Payment method data:", data);
    console.log("Selected address:", selectedAddress);
    // Here you would handle the submission logic
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar cartão de crédito/débito
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar cartão de crédito/débito</DialogTitle>
          <DialogDescription>
            Adicione um novo cartão à sua conta.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do cartão</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validade</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/AA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome no cartão</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome como aparece no cartão" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cardType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit">Crédito</SelectItem>
                        <SelectItem value="debit">Débito</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Padrão</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sim/Não" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Sim</SelectItem>
                        <SelectItem value="no">Não</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />
            
            <AddressSelection 
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
              <DialogTrigger asChild>
                <Button variant="outline" type="button">Cancelar</Button>
              </DialogTrigger>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
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
            
            <div className="grid grid-cols-1 gap-4">
              {mockCards.map((card) => (
                <PaymentMethodCard
                  key={card.id}
                  id={card.id}
                  brand={card.brand}
                  lastFourDigits={card.lastFourDigits}
                  holderName={card.holderName}
                  type={card.type}
                  isDefault={card.lastFourDigits === '5367'}
                  addressId={card.addressId}
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
              Os cartões adicionados aqui estarão disponíveis para uso em suas próximas compras.
              Suas informações de pagamento são armazenadas com segurança e criptografadas.
              Boletos e PIX são gerados no momento do pagamento.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Carteira;
