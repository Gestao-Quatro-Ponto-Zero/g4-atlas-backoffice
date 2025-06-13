# ProfileSection Component

⚠️ **Componente Customizado**: Este componente foi criado porque não existe equivalente no G4 Design System ou Shadcn/UI.

## Justificativa
Seção específica para exibir e editar dados do perfil do usuário com fluxo de verificação por OTP.

## Funcionalidades
- Exibição dos dados pessoais do usuário
- Edição de nome, email e telefone
- Verificação por OTP para email/telefone
- Dialogs modais para edição
- Integração com sistema de toast
- Alternância entre métodos de verificação

## Props
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| - | - | - | Nenhuma prop no momento |

## Uso
```tsx
import { ProfileSection } from '@/components/ProfileSection';

<ProfileSection />
```

## Fluxo de Verificação
1. Usuário clica para editar email/telefone
2. Sistema solicita novo valor
3. Código OTP é enviado
4. Usuário insere código de 6 dígitos
5. Verificação é confirmada

## Dependências
- `useAuth` - Para dados do usuário
- Componentes UI do Shadcn
- `InputOTP` - Para código de verificação
- `toast` - Para feedback