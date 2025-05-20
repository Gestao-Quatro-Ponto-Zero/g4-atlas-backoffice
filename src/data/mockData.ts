
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

// Interface for User data
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

// Interface for Payment Card data
export interface PaymentCard {
  id: string;
  type: 'credit' | 'debit';
  brand: string;
  lastFourDigits: string;
  expiryDate: string;
  holderName: string;
  isDefault?: boolean;
}

// Interface for Address data
export interface Address {
  id: string;
  name: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

// Mock user data
export const mockUser: User = {
  id: 'usr-001',
  name: 'João Silva',
  email: 'joao.silva@example.com',
  avatar: 'https://i.pravatar.cc/300',
  phone: '(11) 98765-4321'
};

// Mock payment cards data
export const mockCards: PaymentCard[] = [
  {
    id: 'card-001',
    type: 'credit',
    brand: 'mastercard',
    lastFourDigits: '4321',
    expiryDate: '12/25',
    holderName: 'JOAO SILVA',
    isDefault: true
  },
  {
    id: 'card-002',
    type: 'credit',
    brand: 'visa',
    lastFourDigits: '5678',
    expiryDate: '06/26',
    holderName: 'JOAO SILVA'
  }
];

// Mock addresses data
export const mockAddresses: Address[] = [
  {
    id: 'addr-001',
    name: 'Casa',
    street: 'Rua das Flores',
    number: '123',
    neighborhood: 'Jardim Primavera',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    isDefault: true
  },
  {
    id: 'addr-002',
    name: 'Trabalho',
    street: 'Avenida Paulista',
    number: '1500',
    complement: 'Sala 203',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-200'
  }
];

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
  },
  {
    id: "ORD7832",
    date: "2025-05-18T08:20:00",
    productName: "Workshop de Desenvolvimento Web, Curso de UX/UI Design, Kit de Ferramentas para Desenvolvedor",
    price: 1299.90,
    status: "approved",
    payments: [
      {
        id: "PAY1238",
        method: "credit_card",
        amount: 1299.90,
        cardDetails: {
          brand: "mastercard",
          lastFourDigits: "9876",
          type: "credit"
        },
        installments: 12,
        receiptUrl: "https://example.com/receipt/1238"
      }
    ]
  },
  {
    id: "ORD7833",
    date: "2025-05-17T16:35:00",
    productName: "Curso de Excel Avançado, Curso de PowerBI, Curso de SQL para Análise de Dados",
    price: 599.70,
    status: "pending",
    payments: [
      {
        id: "PAY1239",
        method: "boleto",
        amount: 599.70,
        installments: 3
      }
    ]
  }
];
