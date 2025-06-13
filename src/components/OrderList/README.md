# OrderList Component

⚠️ **Componente Customizado**: Este componente foi criado porque não existe equivalente no G4 Design System ou Shadcn/UI.

## Justificativa
Componente de listagem específico para pedidos com estado vazio customizado e layout otimizado para a aplicação.

## Funcionalidades
- Listagem de pedidos com OrderCard
- Estado vazio com ilustração
- Layout responsivo
- Espaçamento consistente

## Props
| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| orders | Order[] | - | Array de pedidos para exibir |

## Uso
```tsx
import { OrderList } from '@/components/OrderList';

<OrderList orders={ordersData} />
```

## Estados
- **Com dados**: Renderiza lista de OrderCard
- **Vazio**: Mostra ilustração e mensagem amigável

## Dependências
- `OrderCard` - Para renderizar cada pedido
- `Order` type - Tipagem dos dados
- Ícones do Lucide React