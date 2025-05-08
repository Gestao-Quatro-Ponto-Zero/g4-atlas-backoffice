
// Mock data for development purposes
// This would be replaced with actual API calls in production

export interface User {
  id: string;
  name: string;
  email: string;
  documentNumber: string; // CPF
  phone: string;
}

export interface Address {
  id: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentCard {
  id: string;
  brand: string;
  lastFourDigits: string;
  holderName?: string;
  type?: "credit" | "debit";
  addressId?: string;
}

export interface PaymentDetails {
  id: string;
  method: "credit_card" | "boleto" | "pix";
  amount: number; // Valor parcial do pagamento
  installments?: number;
  cardDetails?: PaymentCard;
  failureReason?: string;
  receiptUrl?: string;
}

export interface Order {
  id: string;
  productName: string;
  price: number;
  date: string;
  status: "pending" | "approved" | "denied";
  payments: PaymentDetails[]; // Agora um array de pagamentos
}

export const mockUser: User = {
  id: "user123",
  name: "Carlos Silva",
  email: "carlos.silva@gmail.com",
  documentNumber: "123.456.789-00",
  phone: "+55 11 98765-4321",
};

export const mockAddresses: Address[] = [
  {
    id: "addr1",
    street: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01001-000",
    isDefault: true
  },
  {
    id: "addr2",
    street: "Av. Paulista, 1000",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    isDefault: false
  }
];

export const mockCards: PaymentCard[] = [
  {
    id: "card1",
    brand: "mastercard",
    lastFourDigits: "5367",
    holderName: "CARLOS SILVA",
    type: "credit",
    addressId: "addr1"
  },
  {
    id: "card2",
    brand: "visa",
    lastFourDigits: "4123",
    holderName: "CARLOS SILVA",
    type: "debit",
    addressId: "addr2"
  }
];

export const mockOrders: Order[] = [
  {
    id: "order1",
    productName: "MBA em Gestão Empresarial",
    price: 4997.00,
    date: "2025-03-25",
    status: "approved",
    payments: [
      {
        id: "payment1",
        method: "credit_card",
        amount: 4997.00,
        installments: 12,
        cardDetails: {
          id: "card1",
          brand: "mastercard",
          lastFourDigits: "5367",
          holderName: "CARLOS SILVA",
          type: "credit"
        },
        receiptUrl: "https://receipt.example.com/123456"
      }
    ]
  },
  {
    id: "order2",
    productName: "Curso de Marketing Digital",
    price: 997.00,
    date: "2025-04-01",
    status: "pending",
    payments: [
      {
        id: "payment2",
        method: "boleto",
        amount: 997.00,
        installments: 2,
        receiptUrl: "https://boleto.example.com/789012"
      }
    ]
  },
  {
    id: "order3",
    productName: "Workshop de Liderança",
    price: 497.00,
    date: "2025-02-15",
    status: "denied",
    payments: [
      {
        id: "payment3",
        method: "credit_card",
        amount: 497.00,
        cardDetails: {
          brand: "visa",
          lastFourDigits: "4123",
          holderName: "CARLOS SILVA",
          type: "credit"
        },
        failureReason: "Cartão expirado"
      }
    ]
  },
  {
    id: "order4",
    productName: "Curso de Data Science",
    price: 2500.00,
    date: "2025-03-10",
    status: "approved",
    payments: [
      {
        id: "payment4a",
        method: "pix",
        amount: 1250.00,
        receiptUrl: "https://pix.example.com/123abc"
      },
      {
        id: "payment4b",
        method: "credit_card",
        amount: 1250.00,
        installments: 10,
        cardDetails: {
          brand: "mastercard",
          lastFourDigits: "5367",
          holderName: "CARLOS SILVA",
          type: "credit"
        },
        receiptUrl: "https://receipt.example.com/456def"
      }
    ]
  }
];
