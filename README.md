# G4 Educação - Checkout Client Hub

Sistema de gestão de clientes e checkout da G4 Educação, construído seguindo as diretrizes do boilerplate React + TypeScript.

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar em desenvolvimento
npm run dev

# Executar testes
npm run test

# Build para produção
npm run build
```

## 📋 Tecnologias

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn/UI** - Biblioteca de componentes (prioridade 2)
- **TanStack Query** - Gerenciamento de estado servidor
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Vitest** - Framework de testes
- **Google Analytics 4** - Analytics integrado

## 🏗️ Arquitetura

### Hierarquia de Componentes

1. **@g4-educacao/g4-apollo-design-system** (PRIORIDADE 1 - quando disponível)
2. **Shadcn/UI** (PRIORIDADE 2 - atual)
3. **Componentes customizados** (PRIORIDADE 3 - último recurso)

### Estrutura de Pastas

```
src/
├── components/
│   ├── G4Components/     # Re-exports do G4 Design System
│   ├── ui/              # Componentes Shadcn/UI
│   └── Analytics/       # Componentes de analytics
├── hooks/               # Hooks personalizados
│   ├── useApi/         # Hook para chamadas de API
│   └── useAnalytics/   # Hook para analytics
├── services/           # Camada de serviços HTTP
├── utils/             # Utilitários
│   └── analytics/     # Funções de analytics
├── pages/             # Páginas da aplicação
└── contexts/          # Contextos React
```

## 🔌 Serviços HTTP

O projeto utiliza Axios com interceptadores configurados:

```tsx
import { userService } from '@/services';

// Uso básico
const user = await userService.getUserProfile();

// Com React Query (recomendado)
const { data: user, isLoading } = useQuery({
  queryKey: ['user', 'profile'],
  queryFn: userService.getUserProfile,
});
```

## 📊 Analytics

Sistema de analytics integrado com Google Analytics 4:

```tsx
import { useAnalytics } from '@/hooks/useAnalytics';

const MyComponent = () => {
  const { trackButtonClick, trackUserAction } = useAnalytics();

  const handleClick = () => {
    trackButtonClick('header-login', { section: 'navigation' });
  };

  return <button onClick={handleClick}>Login</button>;
};
```

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Modo watch para desenvolvimento
npm run test:watch

# Gerar relatório de cobertura
npm run test:coverage

# Interface visual do Vitest
npm run test:ui
```

## 🚀 Deploy

### Lovable (Recomendado)

1. Clique em "Publish" no editor
2. Configure domínio customizado (opcional)
3. Aguarde o build

### Outras Plataformas

```bash
# Build para produção
npm run build

# Preview local do build
npm run preview
```

## 🔧 Configuração

### Variáveis de Ambiente

```env
# API
VITE_API_URL=http://localhost:3001/api

# Analytics
VITE_GA_ID=G-XXXXXXXXXX

# SSO (G4 Educação)
VITE_PUBLIC_LOGIN_URL=https://accounts.g4educacao.com/sso/initialize-auth
VITE_PUBLIC_ACCOUNT_API_URL=https://api.g4educacao.com
VITE_BASE_URL=https://platform.g4educacao.com
```

### Geração de Tipos da API

```bash
# Gerar tipos TypeScript da API
npm run generate:api
```

## 📖 Documentação

- [Componentes UI](./src/components/ui/) - Biblioteca Shadcn/UI
- [Hooks](./src/hooks/) - Hooks personalizados
- [Serviços](./src/services/) - Camada de API
- [Analytics](./src/utils/analytics/) - Sistema de analytics

## 🤝 Contribuição

1. Siga a hierarquia de componentes (G4 > Shadcn > Custom)
2. Sempre adicione testes para novos componentes/hooks
3. Use TypeScript com tipagem forte
4. Documente componentes customizados no README.md

## 📞 Suporte

- **Issues**: Abra uma issue no repositório
- **Documentação**: Consulte os READMEs dos componentes
- **Boilerplate**: [Documentação completa](./docs/)

---

**Versão**: 1.0.0  
**Baseado no**: Boilerplate React + TypeScript G4 Educação