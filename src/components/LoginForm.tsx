
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Acesse sua conta</h2>
          <p className="text-gray-600 mt-2">
            Entre com suas credenciais para acessar seus pedidos e informações
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>
            
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Esqueceu a senha?
            </a>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <a href="#register" className="font-medium text-blue-600 hover:text-blue-500">
                Cadastre-se
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
