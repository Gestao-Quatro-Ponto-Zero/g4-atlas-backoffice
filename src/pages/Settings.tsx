import React from 'react';
import { Layout } from '@/components/Layout';
import { ProfileSection } from '@/components/ProfileSection';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/G4Components';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, LogOut, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const FAQ_ITEMS = [
  {
    question: 'Como funciona a plataforma?',
    answer: 'A G4 Educação é uma plataforma que conecta alunos a cursos de alta qualidade. Oferecemos opções de pagamento flexíveis e suporte contínuo durante todo o processo de aprendizagem.'
  },
  {
    question: 'Como faço para cancelar um curso?',
    answer: 'Para cancelar um curso, acesse a página de "Meus Pedidos", localize o curso desejado e clique no botão de cancelamento. O processo pode estar sujeito aos termos e condições específicos de cada curso.'
  },
  {
    question: 'Posso emitir uma segunda via de boleto vencido?',
    answer: 'Sim, é possível emitir uma segunda via de boletos vencidos. Acesse a seção "Cobranças", localize o boleto vencido e selecione a opção "Gerar segunda via". Uma nova data de vencimento será atribuída ao boleto.'
  },
  {
    question: 'Quais são as formas de pagamento aceitas?',
    answer: 'Aceitamos cartões de crédito e débito das principais bandeiras, boleto bancário e PIX. Todas as transações são protegidas e criptografadas para garantir sua segurança.'
  },
  {
    question: 'Como alterar meus dados cadastrais?',
    answer: 'Para alterar seus dados cadastrais, acesse a página de "Configurações", clique no botão "Editar" ao lado dos dados pessoais e faça as alterações necessárias. Após concluir, clique em "Salvar".'
  },
];

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Você foi desconectado com sucesso');
    navigate('/');
  };

  const handleWhatsAppSupport = () => {
    // Usually this would link to a real support number with a pre-defined message
    window.open('https://wa.me/5511999999999?text=Olá,%20preciso%20de%20ajuda%20com%20a%20plataforma%20G4%20Educação.', '_blank');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6 pb-6">
        {/* User Profile Section */}
        <ProfileSection />
        
        {/* Support Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xl">Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <HelpCircle className="h-8 w-8 mb-2 text-blue-600" />
                    <h3 className="font-medium mb-2">Perguntas Frequentes</h3>
                    <p className="text-sm text-gray-500 mb-4">Encontre respostas para dúvidas comuns</p>
                    
                    <Accordion type="single" collapsible className="w-full">
                      {FAQ_ITEMS.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                          <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <MessageCircle className="h-8 w-8 mb-2 text-green-600" />
                    <h3 className="font-medium mb-2">Contato via WhatsApp</h3>
                    <p className="text-sm text-gray-500 mb-4">Fale diretamente com nossa equipe de suporte</p>
                    <Button 
                      onClick={handleWhatsAppSupport}
                      variant="whatsapp"
                      className="w-full"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contatar Suporte
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        {/* Logout Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <h3 className="font-medium mb-4">Deseja sair da sua conta?</h3>
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                className="w-full max-w-xs"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;