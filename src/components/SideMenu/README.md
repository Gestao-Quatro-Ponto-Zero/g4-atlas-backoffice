# SideMenu Component

⚠️ **Componente Customizado**: Este componente foi criado porque não existe equivalente no G4 Design System ou Shadcn/UI.

## Justificativa
Menu lateral específico da aplicação com navegação responsiva, informações do usuário e integração com sistema de autenticação.

## Funcionalidades
- Menu lateral responsivo (desktop/mobile)
- Informações do usuário logado
- Navegação entre páginas
- Avatar com iniciais do usuário
- Links para termos e políticas
- Botão de ajuda
- Drawer para mobile

## Props
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| isOpen | boolean | - | Controla abertura (mobile) |
| onOpenChange | function | - | Callback para mudança de estado |

## Uso
```tsx
import { SideMenu } from '@/components/SideMenu';

// Desktop (sempre visível)
<SideMenu />

// Mobile (com controle de estado)
<SideMenu isOpen={isOpen} onOpenChange={setIsOpen} />
```

## Responsividade
- **Desktop**: Sidebar fixa com componentes do Shadcn
- **Mobile**: Drawer que abre/fecha conforme necessário

## Dependências
- `useAuth` - Para dados do usuário
- `useIsMobile` - Para responsividade
- React Router - Para navegação
- Componentes UI do Shadcn