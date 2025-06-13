import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Search,
  BookOpen,
  Video,
  FileText,
  Users,
  CreditCard,
  Settings,
  Package
} from 'lucide-react';
import { toast } from 'sonner';

const FAQ_CATEGORIES = [
  {
    id: 'geral',
    title: 'Geral',
    icon: HelpCircle,
    questions: [
      {
        question: 'Como funciona a plataforma G4 Educação?',
        answer: 'A G4 Educação é uma plataforma educacional que oferece cursos online de alta qualidade. Você pode se inscrever em cursos, acompanhar seu progresso, fazer pagamentos e gerenciar sua conta através do nosso portal.'
      },
      {
        question: 'Como criar uma conta?',
        answer: 'Para criar uma conta, clique no botão "Cadastrar" na página inicial, preencha seus dados pessoais e confirme seu e-mail. Após a confirmação, você já pode acessar a plataforma.'
      },
      {
        question: 'Esqueci minha senha, como recuperar?',
        answer: 'Na tela de login, clique em "Esqueci minha senha", digite seu e-mail cadastrado e você receberá instruções para criar uma nova senha.'
      }
    ]
  },
  {
    id: 'cursos',
    title: 'Cursos',
    icon: BookOpen,
    questions: [
      {
        question: 'Como me inscrever em um curso?',
        answer: 'Navegue pelo catálogo de cursos, selecione o curso desejado, clique em "Inscrever-se" e siga as instruções de pagamento. Após a confirmação do pagamento, você terá acesso imediato ao conteúdo.'
      },
      {
        question: 'Posso acessar os cursos offline?',
        answer: 'Alguns materiais podem ser baixados para acesso offline, dependendo do curso. Verifique na descrição do curso se essa funcionalidade está disponível.'
      },
      {
        question: 'Por quanto tempo tenho acesso ao curso?',
        answer: 'O tempo de acesso varia por curso. Cursos básicos geralmente têm acesso por 12 meses, enquanto cursos premium podem ter acesso vitalício. Consulte a descrição específica de cada curso.'
      }
    ]
  },
  {
    id: 'pagamentos',
    title: 'Pagamentos',
    icon: CreditCard,
    questions: [
      {
        question: 'Quais formas de pagamento são aceitas?',
        answer: 'Aceitamos cartões de crédito e débito (Visa, Mastercard), boleto bancário e PIX. Todas as transações são seguras e criptografadas.'
      },
      {
        question: 'Posso parcelar minha compra?',
        answer: 'Sim, oferecemos parcelamento em até 12x no cartão de crédito para a maioria dos cursos. As opções de parcelamento são exibidas durante o checkout.'
      },
      {
        question: 'Como emitir segunda via de boleto?',
        answer: 'Acesse "Meus Pagamentos" no menu, localize o boleto vencido e clique em "Gerar segunda via". Um novo boleto será gerado com nova data de vencimento.'
      },
      {
        question: 'Posso cancelar minha compra?',
        answer: 'Sim, você tem até 7 dias após a compra para solicitar o cancelamento, conforme o Código de Defesa do Consumidor. Entre em contato conosco para processar o reembolso.'
      }
    ]
  },
  {
    id: 'conta',
    title: 'Minha Conta',
    icon: Users,
    questions: [
      {
        question: 'Como alterar meus dados pessoais?',
        answer: 'Acesse "Configurações" no menu principal, clique em "Dados Pessoais" e edite as informações desejadas. Não se esqueça de salvar as alterações.'
      },
      {
        question: 'Como alterar minha senha?',
        answer: 'Vá em "Configurações" > "Segurança" e clique em "Alterar senha". Digite sua senha atual e a nova senha duas vezes para confirmar.'
      },
      {
        question: 'Como excluir minha conta?',
        answer: 'Para excluir sua conta, entre em contato com nosso suporte. Lembre-se que esta ação é irreversível e você perderá acesso a todos os cursos adquiridos.'
      }
    ]
  },
  {
    id: 'tecnico',
    title: 'Suporte Técnico',
    icon: Settings,
    questions: [
      {
        question: 'O vídeo não carrega, o que fazer?',
        answer: 'Verifique sua conexão com a internet, limpe o cache do navegador ou tente acessar em modo anônimo. Se o problema persistir, entre em contato conosco.'
      },
      {
        question: 'Quais navegadores são suportados?',
        answer: 'Recomendamos Chrome, Firefox, Safari ou Edge nas versões mais recentes. Para melhor experiência, mantenha seu navegador sempre atualizado.'
      },
      {
        question: 'Posso acessar pelo celular?',
        answer: 'Sim, nossa plataforma é totalmente responsiva e funciona perfeitamente em dispositivos móveis através do navegador.'
      }
    ]
  }
];

const CONTACT_OPTIONS = [
  {
    title: 'WhatsApp',
    description: 'Fale conosco pelo WhatsApp',
    icon: MessageCircle,
    action: 'whatsapp',
    info: '(11) 99999-9999',
    available: '24/7'
  },
  {
    title: 'E-mail',
    description: 'Envie sua dúvida por e-mail',
    icon: Mail,
    action: 'email',
    info: 'suporte@g4educacao.com',
    available: 'Resposta em até 24h'
  },
  {
    title: 'Telefone',
    description: 'Ligue para nosso suporte',
    icon: Phone,
    action: 'phone',
    info: '(11) 3333-4444',
    available: 'Seg-Sex 8h às 18h'
  }
];

const Ajuda = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('geral');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria enviado o formulário para o backend
    toast.success('Mensagem enviada com sucesso! Retornaremos em breve.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleContactAction = (action: string, info: string) => {
    switch (action) {
      case 'whatsapp':
        window.open(`https://wa.me/5511999999999?text=Olá,%20preciso%20de%20ajuda%20com%20a%20plataforma%20G4%20Educação.`, '_blank');
        break;
      case 'email':
        window.open(`mailto:${info}?subject=Dúvida sobre a plataforma`);
        break;
      case 'phone':
        window.open(`tel:${info.replace(/\D/g, '')}`);
        break;
    }
  };

  const filteredQuestions = FAQ_CATEGORIES.flatMap(category => 
    category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(q => ({ ...q, category: category.title }))
  );

  const currentCategory = FAQ_CATEGORIES.find(cat => cat.id === selectedCategory);

  return (
    <Layout>
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-0">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Central de Ajuda</h1>
          <p className="text-gray-600">
            Encontre respostas para suas dúvidas ou entre em contato conosco
          </p>
        </div>

        {/* Barra de Pesquisa */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Pesquisar por dúvidas..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 text-base"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar com Categorias */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {FAQ_CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          selectedCategory === category.id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : ''
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        <span className="font-medium">{category.title}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Contatos Rápidos */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Contato Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {CONTACT_OPTIONS.map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleContactAction(contact.action, contact.info)}
                      className="w-full p-3 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center mb-1">
                        <Icon className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="font-medium text-sm">{contact.title}</span>
                      </div>
                      <p className="text-xs text-gray-600">{contact.info}</p>
                      <p className="text-xs text-gray-500">{contact.available}</p>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {searchTerm ? (
              /* Resultados da Pesquisa */
              <Card>
                <CardHeader>
                  <CardTitle>
                    Resultados da pesquisa para "{searchTerm}" ({filteredQuestions.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredQuestions.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {filteredQuestions.map((item, index) => (
                        <AccordionItem key={index} value={`search-item-${index}`}>
                          <AccordionTrigger className="text-left">
                            <div>
                              <div className="font-medium">{item.question}</div>
                              <div className="text-sm text-gray-500 mt-1">Categoria: {item.category}</div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-700">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Nenhum resultado encontrado para sua pesquisa.</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Tente usar palavras-chave diferentes ou entre em contato conosco.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* FAQ por Categoria */
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {currentCategory && (
                      <>
                        <currentCategory.icon className="h-6 w-6 mr-2" />
                        {currentCategory.title}
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {currentCategory?.questions.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            )}

            {/* Formulário de Contato */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Não encontrou sua resposta?</CardTitle>
                <p className="text-gray-600">Envie sua dúvida e nossa equipe retornará em breve.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Assunto</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Links Úteis */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Links Úteis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/termos" className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">Termos de Uso</div>
                      <div className="text-sm text-gray-500">Leia nossos termos e condições</div>
                    </div>
                  </a>
                  <a href="/privacidade" className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <FileText className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">Política de Privacidade</div>
                      <div className="text-sm text-gray-500">Como protegemos seus dados</div>
                    </div>
                  </a>
                  <a href="/cursos" className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Package className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">Catálogo de Cursos</div>
                      <div className="text-sm text-gray-500">Explore nossos cursos disponíveis</div>
                    </div>
                  </a>
                  <a href="/tutorial" className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <Video className="h-5 w-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">Tutorial da Plataforma</div>
                      <div className="text-sm text-gray-500">Aprenda a usar a plataforma</div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ajuda;