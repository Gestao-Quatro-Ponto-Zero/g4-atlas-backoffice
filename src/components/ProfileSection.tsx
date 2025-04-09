
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, X } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from 'sonner';

const ProfileSection: React.FC = () => {
  const { user } = useAuth();
  const userData = user as User;
  
  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  
  const [editName, setEditName] = useState(userData?.name || '');
  const [editEmail, setEditEmail] = useState(userData?.email || '');
  const [editPhone, setEditPhone] = useState(userData?.phone || '');
  const [otpValue, setOtpValue] = useState('');
  const [verifyingField, setVerifyingField] = useState<'email' | 'phone' | null>(null);
  
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

  const handleSaveName = () => {
    // In a real app, this would update the user's name via an API
    toast.success('Nome atualizado com sucesso');
    setIsNameDialogOpen(false);
  };

  const handleRequestVerification = (type: 'email' | 'phone') => {
    setVerifyingField(type);
    if (type === 'email') {
      setIsEmailDialogOpen(false);
    } else {
      setIsPhoneDialogOpen(false);
    }
    setIsOtpDialogOpen(true);
    // In a real app, this would send a verification code to email or phone
    toast.success(`Código de verificação enviado para o seu ${type === 'email' ? 'e-mail' : 'telefone'}`);
  };

  const handleVerifyOtp = () => {
    // In a real app, this would verify the OTP code
    if (otpValue.length === 6) {
      toast.success(`${verifyingField === 'email' ? 'E-mail' : 'Telefone'} verificado com sucesso`);
      setIsOtpDialogOpen(false);
      setOtpValue('');
      setVerifyingField(null);
    } else {
      toast.error('Por favor, insira o código completo');
    }
  };

  const resendCode = () => {
    // In a real app, this would resend the verification code
    toast.success(`Novo código enviado para o seu ${verifyingField === 'email' ? 'e-mail' : 'telefone'}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl">Dados Pessoais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-24 w-24 bg-[#FEC6A1] text-white text-xl">
            <AvatarFallback>{getInitials(userData?.name || '')}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="space-y-0 divide-y">
          {/* Name field */}
          <div 
            className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-50" 
            onClick={() => setIsNameDialogOpen(true)}
          >
            <div className="text-sm text-gray-500">Nome</div>
            <div className="flex items-center">
              <span className="text-gray-900 mr-2">{userData?.name}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          {/* Email field */}
          <div 
            className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-50" 
            onClick={() => setIsEmailDialogOpen(true)}
          >
            <div className="text-sm text-gray-500">E-mail</div>
            <div className="flex items-center">
              <span className="text-gray-900 mr-2">{userData?.email}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          {/* Phone field */}
          <div 
            className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-50" 
            onClick={() => setIsPhoneDialogOpen(true)}
          >
            <div className="text-sm text-gray-500">Telefone</div>
            <div className="flex items-center">
              <span className="text-gray-900 mr-2">{userData?.phone}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </CardContent>

      {/* Name Edit Dialog */}
      <Dialog open={isNameDialogOpen} onOpenChange={setIsNameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center mb-4">Atualizar nome</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Input 
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Nome completo"
            />
            <Button onClick={handleSaveName}>Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Edit Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center mb-4">Atualizar e-mail</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Input 
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              placeholder="E-mail"
            />
            <Button onClick={() => handleRequestVerification('email')}>
              Validar e-mail
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone Edit Dialog */}
      <Dialog open={isPhoneDialogOpen} onOpenChange={setIsPhoneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center mb-4">Atualizar telefone</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Input 
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
              placeholder="Telefone"
            />
            <Button onClick={() => handleRequestVerification('phone')}>
              Validar telefone
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">Confirmar {verifyingField}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-6 py-4">
            <p className="text-center text-gray-700">
              Digite o código enviado para {verifyingField === 'email' ? editEmail : editPhone}
            </p>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button onClick={handleVerifyOtp} className="w-full">
              Verificar {verifyingField === 'email' ? 'e-mail' : 'telefone'}
            </Button>
            <Button 
              variant="outline" 
              onClick={resendCode} 
              className="w-full"
            >
              Reenviar código
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProfileSection;
