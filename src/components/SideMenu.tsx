
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingBag, 
  CreditCard, 
  MapPin, 
  Settings, 
  ChevronRight, 
  Menu, 
  X,
  Wallet,
  Plus
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger 
} from '@/components/ui/drawer';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from '@/components/ui/sidebar';

interface SideMenuProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  popover?: boolean;
  popoverContent?: React.ReactNode;
}

interface SavedCard {
  id: string;
  brand: string;
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault?: boolean;
}

const savedCards: SavedCard[] = [
  { 
    id: 'card1', 
    brand: 'mastercard', 
    lastFour: '5367', 
    expiryMonth: '12', 
    expiryYear: '2027',
    isDefault: true
  },
  { 
    id: 'card2', 
    brand: 'visa', 
    lastFour: '4123', 
    expiryMonth: '09', 
    expiryYear: '2025' 
  }
];

const WalletContent = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">Cartões salvos</h3>
      </div>
      <div className="space-y-3 mb-4">
        {savedCards.map((card) => (
          <div 
            key={card.id} 
            className={cn(
              "px-3 py-2 border rounded-md flex items-center justify-between", 
              card.isDefault ? "border-blue-300 bg-blue-50" : "border-gray-200"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-6 rounded flex items-center justify-center bg-white border">
                {card.brand === 'visa' && (
                  <span className="text-blue-700 font-bold text-xs">VISA</span>
                )}
                {card.brand === 'mastercard' && (
                  <div className="flex">
                    <div className="w-3 h-3 bg-red-500 rounded-full opacity-85 -mr-1"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-85"></div>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm">•••• {card.lastFour}</p>
                <p className="text-xs text-gray-500">{card.expiryMonth}/{card.expiryYear}</p>
              </div>
            </div>
            {card.isDefault && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Padrão</span>
            )}
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full">
        <Plus className="mr-1 h-4 w-4" /> Adicionar cartão
      </Button>
    </div>
  );
};

const MobileMenu = () => {
  const { user } = useAuth();
  const firstLetter = user?.name?.charAt(0) || 'U';

  const menuItems: MenuItem[] = [
    { icon: ShoppingBag, label: 'Meus Pedidos', href: '/', active: true },
    { icon: Wallet, label: 'Minha Carteira', href: '#', popover: true, popoverContent: <WalletContent /> },
    { icon: MapPin, label: 'Endereços', href: '/enderecos' },
    { icon: Settings, label: 'Configurações', href: '/configuracoes' },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[95%]">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="text-xl font-bold text-blue-600">G4</div>
                  <div className="ml-1 text-lg">Educação</div>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center py-4">
            <Avatar className="h-20 w-20 bg-emerald-500 text-white text-xl">
              <AvatarFallback>{firstLetter}</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 font-medium text-base">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        
        <div className="flex flex-col py-2">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              {item.popover ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn(
                      "flex items-center justify-between w-full px-6 py-4 hover:bg-gray-50 text-left",
                      item.active && "bg-gray-50"
                    )}>
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 text-gray-700" />
                        <span className="ml-3 text-sm font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-3" align="start">
                    {item.popoverContent}
                  </PopoverContent>
                </Popover>
              ) : (
                <a 
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-6 py-4 hover:bg-gray-50",
                    item.active && "bg-gray-50"
                  )}
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 text-gray-700" />
                    <span className="ml-3 text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </a>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-auto p-6">
          <div className="flex justify-center">
            <Button variant="outline" className="rounded-full text-sm">Ajuda</Button>
          </div>
          <div className="flex justify-center space-x-4 mt-6 text-xs text-gray-500">
            <a href="/termos" className="hover:underline">Termos</a>
            <a href="/privacidade" className="hover:underline">Privacidade</a>
            <a href="/cookies" className="hover:underline">Cookies</a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const DesktopMenu = () => {
  const { user } = useAuth();
  const firstLetter = user?.name?.charAt(0) || 'U';
  
  const menuItems: MenuItem[] = [
    { icon: ShoppingBag, label: 'Meus Pedidos', href: '/', active: true },
    { icon: Wallet, label: 'Minha Carteira', href: '#', popover: true, popoverContent: <WalletContent /> },
    { icon: MapPin, label: 'Endereços', href: '/enderecos' },
    { icon: Settings, label: 'Configurações', href: '/configuracoes' },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="floating" className="hidden md:flex">
        <SidebarHeader className="flex flex-col items-center py-6 px-2">
          <div className="flex items-center pb-6">
            <div className="text-xl font-bold text-blue-600">G4</div>
            <div className="ml-1 text-lg">Educação</div>
          </div>
          
          <Avatar className="h-20 w-20 bg-emerald-500 text-white text-xl">
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
          <h3 className="mt-4 font-medium text-base">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </SidebarHeader>
        
        <SidebarContent className="px-3 py-4">
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                {item.popover ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <SidebarMenuButton isActive={item.active}>
                        <div className="flex items-center justify-between w-full group/menu-button">
                          <div className="flex items-center">
                            <item.icon className="h-5 w-5" />
                            <span className="ml-3">{item.label}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 opacity-70" />
                        </div>
                      </SidebarMenuButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-3" side="right" align="start">
                      {item.popoverContent}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <SidebarMenuButton asChild isActive={item.active}>
                    <a 
                      href={item.href}
                      className="flex items-center justify-between group/menu-button"
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5" />
                        <span className="ml-3">{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-70" />
                    </a>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="mt-auto py-6 px-4">
          <div className="flex justify-center">
            <Button variant="outline" className="rounded-full w-full text-sm">Ajuda</Button>
          </div>
          <div className="flex justify-center space-x-4 mt-6 text-xs text-gray-500">
            <a href="/termos" className="hover:underline">Termos</a>
            <a href="/privacidade" className="hover:underline">Privacidade</a>
            <a href="/cookies" className="hover:underline">Cookies</a>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

const SideMenu: React.FC<SideMenuProps> = () => {
  return (
    <>
      <MobileMenu />
      <DesktopMenu />
    </>
  );
};

export default SideMenu;
