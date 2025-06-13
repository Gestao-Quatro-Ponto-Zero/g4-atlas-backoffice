# Layout Component

⚠️ **Componente Customizado**: Este componente foi criado porque não existe equivalente no G4 Design System ou Shadcn/UI.

## Justificativa
Layout principal da aplicação que gerencia a estrutura de páginas, incluindo sidebar responsiva e área de conteúdo.

## Funcionalidades
- Layout responsivo com sidebar
- Integração com sistema de autenticação
- Suporte para mobile e desktop
- Gerenciamento automático de espaçamento

## Props
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| children | ReactNode | - | Conteúdo a ser renderizado |

## Uso
```tsx
import { Layout } from '@/components/Layout';

<Layout>
  <YourPageContent />
</Layout>
```

## Dependências
- `useAuth` - Para verificar autenticação
- `useIsMobile` - Para responsividade
- `SideMenu` - Menu lateral