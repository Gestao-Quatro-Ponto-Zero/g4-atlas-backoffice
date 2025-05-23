
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  Package, 
  ChevronRight, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader
} from '@/components/ui/drawer';
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
import { useIsMobile } from '@/hooks/use-mobile';

interface SideMenuProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const MobileMenu = () => {
  const { user, logout } = useAuth();
  const firstLetter = user?.name?.charAt(0) || 'U';
  const location = useLocation();
  const pathname = location.pathname;

  const menuItems: MenuItem[] = [
    { icon: Users, label: 'Usuários', href: '/usuarios', active: pathname === '/usuarios' },
    { icon: Package, label: 'Produtos', href: '/produtos', active: pathname === '/produtos' },
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
        <DrawerHeader>
          <DrawerTitle className="sr-only">Menu de navegação</DrawerTitle>
          <DrawerDescription className="sr-only">Menu principal da aplicação</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src="/lovable-uploads/c078ae70-9089-43ad-8657-a628953d196f.png" 
                    alt="G4 Educação Logo" 
                    className="h-6 w-auto object-contain"
                  />
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
            <Avatar className="h-20 w-20 bg-[#ea384c] text-white text-xl">
              <AvatarFallback>{firstLetter}</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 font-medium text-base">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        
        <div className="flex flex-col py-2">
          {menuItems.map((item, index) => (
            <div key={index} className="relative">
              <Link 
                to={item.href}
                className={cn(
                  "flex items-center justify-between px-6 py-4 hover:bg-gray-50",
                  item.active && "bg-gray-50"
                )}
              >
                <div className="flex items-center">
                  <item.icon className={cn(
                    "h-5 w-5 text-gray-700",
                    item.active && "text-[#ea384c]"
                  )} />
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
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
    { icon: Users, label: 'Usuários', href: '/usuarios', active: pathname === '/usuarios' },
    { icon: Package, label: 'Produtos', href: '/produtos', active: pathname === '/produtos' },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="floating" className="hidden md:flex" style={{width: '220px'}}>
        <SidebarHeader className="flex flex-col items-center py-4 px-2">
          <div className="flex items-center pb-4">
            <img 
              src="/lovable-uploads/c078ae70-9089-43ad-8657-a628953d196f.png" 
              alt="G4 Educação Logo" 
              className="h-6 w-auto"
            />
          </div>
          
          <Avatar className="h-16 w-16 bg-[#ea384c] text-white text-xl">
            <AvatarFallback>{firstLetter}</AvatarFallback>
          </Avatar>
          <h3 className="mt-3 font-medium text-sm">{user?.name}</h3>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </SidebarHeader>
        
        <SidebarContent className="px-2 py-2">
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton asChild isActive={item.active}>
                  <Link 
                    to={item.href}
                    className="flex items-center justify-between group/menu-button"
                  >
                    <div className="flex items-center">
                      <item.icon className={cn(
                        "h-4 w-4",
                        item.active ? "text-[#ea384c]" : ""
                      )} />
                      <span className="ml-2 text-sm">{item.label}</span>
                    </div>
                    <ChevronRight className="h-3 w-3 opacity-70" />
                  </Link>
                </SidebarMenuButton>
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
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
    </>
  );
};

export default SideMenu;
