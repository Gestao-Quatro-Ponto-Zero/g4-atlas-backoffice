# OrderCard Component

⚠️ **Componente Customizado**: Este componente foi criado porque não existe equivalente no G4 Design System ou Shadcn/UI.

## Justificativa
Componente específico para exibir informações de pedidos com funcionalidades complexas como modal de detalhes, diferentes estados de pagamento e integração com contratos.

## Funcionalidades
- Exibição de informações do pedido
- Modal com detalhes completos
- Estados visuais para diferentes status
- Integração com sistema de pagamentos
- Suporte a contratos
- Ações contextuais (retry, suporte, etc.)

## Props
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| order | Order | - | Dados do pedido |
| isDialogOpen | boolean | - | Controla abertura do modal |
| onDialogClose | function | - | Callback para fechar modal |

## Uso
```tsx
import { OrderCard } from '@/components/OrderCard';

<OrderCard 
  order={orderData}
  isDialogOpen={isOpen}
  onDialogClose={() => setIsOpen(false)}
/>
```

## Dependências
- Componentes UI do Shadcn
- Formatters de data e moeda
- Sistema de navegação
- Dados mockados