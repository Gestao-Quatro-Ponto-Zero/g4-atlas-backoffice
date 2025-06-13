# LoginForm Component

⚠️ **Componente Customizado**: Este componente foi criado porque não existe equivalente no G4 Design System ou Shadcn/UI.

## Justificativa
Formulário de login específico da aplicação com integração ao sistema de autenticação e validações customizadas.

## Funcionalidades
- Formulário de login com email e senha
- Validação de campos obrigatórios
- Estados de loading durante autenticação
- Integração com sistema de toast para feedback
- Opção "Lembrar de mim"
- Link para recuperação de senha

## Props
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| - | - | - | Nenhuma prop no momento |

## Uso
```tsx
import { LoginForm } from '@/components/LoginForm';

<LoginForm />
```

## Dependências
- `useAuth` - Para autenticação
- `Button` - Do G4 Design System
- `Input` - Do Shadcn/UI
- `toast` - Para notificações