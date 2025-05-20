export interface PaymentDetails {
  id: string;
  method: string;
  amount: number;
  cardDetails?: {
    brand: string;
    lastFourDigits: string;
    type: 'credit' | 'debit';
  };
  installments?: number;
  receiptUrl?: string;
}

export interface Order {
  id: string;
  date: string;
  productName: string; // Now this can contain multiple products separated by commas
  price: number;
  status: 'approved' | 'pending' | 'denied';
  payments: PaymentDetails[];
}

export const mockOrders: Order[] = [
  {
    id: "ORD7829",
    date: "2025-05-15T10:30:00",
    productName: "Curso de Programação Java, Curso de Python Avançado",
    price: 399.90,
    status: "approved",
    payments: [
      {
        id: "PAY1234",
        method: "credit_card",
        amount: 399.90,
        cardDetails: {
          brand: "mastercard",
          lastFourDigits: "4321",
          type: "credit"
        },
        installments: 3,
        receiptUrl: "https://example.com/receipt/1234"
      }
    ]
  },
  {
    id: "ORD7830",
    date: "2025-05-14T14:45:00",
    productName: "Assinatura Premium",
    price: 59.90,
    status: "pending",
    payments: [
      {
        id: "PAY1235",
        method: "boleto",
        amount: 59.90,
        installments: 1,
      }
    ]
  },
  {
    id: "ORD7831",
    date: "2025-05-10T09:15:00",
    productName: "Curso de Marketing Digital, E-book Marketing nas Redes Sociais, Mentoria Individual",
    price: 899.90,
    status: "denied",
    payments: [
      {
        id: "PAY1236",
        method: "credit_card",
        amount: 449.95,
        cardDetails: {
          brand: "visa",
          lastFourDigits: "5678",
          type: "credit"
        },
        installments: 2
      },
      {
        id: "PAY1237",
        method: "pix",
        amount: 449.95,
      }
    ]
  }
];
