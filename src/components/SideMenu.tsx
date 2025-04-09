import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Plus,
  LogOut,
  Receipt,
  FileText 
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { mockCards } from '@/data/mockData';

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
  dropdown?: boolean;
  dropdownContent?: React.ReactNode;
}

const WalletContent = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">Cartões salvos</h3>
      </div>
      <div className="space-y-3 mb-4">
        {mockCards.map((card) => (
          <div 
            key={card.lastFourDigits} 
            className="px-3 py-2 border rounded-md flex items-center justify-between border-gray-200"
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
                <div className="flex items-center">
                  <p className="text-sm">•••• {card.lastFourDigits}</p>
                  <span className="ml-2 text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                    {card.type === 'credit' ? 'Crédito' : 'Débito'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full">
        <Plus className="mr-1 h-4 w-4" /> Adicionar cartão de crédito/débito
      </Button>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Boletos e PIX são gerados no momento do pagamento.
      </p>
    </div>
  );
};

const SettingsDropdownContent = ({ logout }: { logout: () => void }) => (
  <div className="w-full">
    <Button variant="ghost" className="w-full flex justify-start text-sm" asChild>
      <Link to="/configuracoes">Meu perfil</Link>
    </Button>
    <Button variant="ghost" className="w-full flex justify-start text-red-600 text-sm" onClick={logout}>
      <LogOut className="mr-2 h-4 w-4" />
      Sair
    </Button>
  </div>
);

const MobileMenu = () => {
  const { user, logout } = useAuth();
  const firstLetter = user?.name?.charAt(0) || 'U';
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems: MenuItem[] = [
    { icon: ShoppingBag, label: 'Meus Pedidos', href: '/', active: pathname === '/' },
    { icon: Receipt, label: 'Cobranças', href: '/cobrancas', active: pathname === '/cobrancas' },
    { icon: FileText, label: 'Contratos', href: '/contratos', active: pathname === '/contratos' },
    { icon: Wallet, label: 'Minha Carteira', href: '/carteira', active: pathname === '/carteira' },
    { icon: MapPin, label: 'Endereços', href: '/enderecos', active: pathname === '/enderecos' },
    { 
      icon: Settings, 
      label: 'Configurações', 
      href: '/configuracoes',
      active: pathname === '/configuracoes'
    },
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
              {item.dropdown ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
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
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60 p-2">
                    {item.dropdownContent}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : item.popover ? (
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
                <Link 
                  to={item.href}
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
                </Link>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-auto p-6">
          <div className="flex justify-center">
            <Button variant="outline" className="rounded-full text-sm">Ajuda</Button>
          </div>
          <div className="flex justify-center space-x-4 mt-6 text-xs text-gray-500">
            <Link to="/termos" className="hover:underline">Termos</Link>
            <Link to="/privacidade" className="hover:underline">Privacidade</Link>
            <Link to="/cookies" className="hover:underline">Cookies</Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const DesktopMenu = () => {
  const { user, logout } = useAuth();
  const firstLetter = user?.name?.charAt(0) || 'U';
  const location = useLocation();
  const pathname = location.pathname;
  
  const menuItems: MenuItem[] = [
    { icon: ShoppingBag, label: 'Meus Pedidos', href: '/', active: pathname === '/' },
    { icon: Receipt, label: 'Cobranças', href: '/cobrancas', active: pathname === '/cobrancas' },
    { icon: FileText, label: 'Contratos', href: '/contratos', active: pathname === '/contratos' },
    { icon: Wallet, label: 'Minha Carteira', href: '/carteira', active: pathname === '/carteira' },
    { icon: MapPin, label: 'Endereços', href: '/enderecos', active: pathname === '/enderecos' },
    { 
      icon: Settings, 
      label: 'Configurações', 
      href: '/configuracoes',
      active: pathname === '/configuracoes'
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="floating" className="hidden md:flex" style={{width: '220px'}}>
        <SidebarHeader className="flex flex-col items-center py-4 px-2">
          <div className="flex items-center pb-4">
            <div className="text-xl font-bold text-blue-600">G4</div>
            <div className="ml-1 text-lg">Educação</div>
          </div>
          
          <Avatar className="h-16 w-16 bg-emerald-500 text-white text-xl">
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
          <h3 className="mt-3 font-medium text-sm">{user?.name}</h3>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </SidebarHeader>
        
        <SidebarContent className="px-2 py-2">
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                {item.dropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton isActive={item.active}>
                        <div className="flex items-center justify-between w-full group/menu-button">
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4" />
                            <span className="ml-2 text-sm">{item.label}</span>
                          </div>
                          <ChevronRight className="h-3 w-3 opacity-70" />
                        </div>
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 p-2" side="right">
                      {item.dropdownContent}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : item.popover ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <SidebarMenuButton isActive={item.active}>
                        <div className="flex items-center justify-between w-full group/menu-button">
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4" />
                            <span className="ml-2 text-sm">{item.label}</span>
                          </div>
                          <ChevronRight className="h-3 w-3 opacity-70" />
                        </div>
                      </SidebarMenuButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-3" side="right" align="start">
                      {item.popoverContent}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <SidebarMenuButton asChild isActive={item.active}>
                    <Link 
                      to={item.href}
                      className="flex items-center justify-between group/menu-button"
                    >
                      <div className="flex items-center">
                        <item.icon className="h-4 w-4" />
                        <span className="ml-2 text-sm">{item.label}</span>
                      </div>
                      <ChevronRight className="h-3 w-3 opacity-70" />
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="mt-auto py-4 px-3">
          <div className="flex justify-center">
            <Button variant="outline" className="rounded-full w-full text-sm">Ajuda</Button>
          </div>
          <div className="flex justify-center space-x-3 mt-4 text-xs text-gray-500">
            <Link to="/termos" className="hover:underline">Termos</Link>
            <Link to="/privacidade" className="hover:underline">Privacidade</Link>
            <Link to="/cookies" className="hover:underline">Cookies</Link>
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
