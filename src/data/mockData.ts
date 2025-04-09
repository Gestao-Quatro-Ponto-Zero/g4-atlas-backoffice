
// Mock data for development purposes
// This would be replaced with actual API calls in production

export interface User {
  id: string;
  name: string;
  email: string;
  documentNumber: string; // CPF
  phone: string;
}

export interface PaymentCard {
  brand: string;
  lastFourDigits: string;
  holderName?: string;
}

export interface PaymentDetails {
  method: "credit_card" | "boleto" | "pix";
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
  paymentDetails: PaymentDetails;
}

export const mockUser: User = {
  id: "user123",
  name: "Carlos Silva",
  email: "carlos.silva@gmail.com",
  documentNumber: "123.456.789-00",
  phone: "+55 11 98765-4321",
};

export const mockOrders: Order[] = [
  {
    id: "order1",
    productName: "MBA em Gestão Empresarial",
    price: 4997.00,
    date: "2025-03-25",
    status: "approved",
    paymentDetails: {
      method: "credit_card",
      cardDetails: {
        brand: "mastercard",
        lastFourDigits: "5367",
        holderName: "CARLOS SILVA"
      },
      receiptUrl: "https://receipt.example.com/123456"
    }
  },
  {
    id: "order2",
    productName: "Curso de Marketing Digital",
    price: 997.00,
    date: "2025-04-01",
    status: "pending",
    paymentDetails: {
      method: "boleto",
      receiptUrl: "https://boleto.example.com/789012"
    }
  },
  {
    id: "order3",
    productName: "Workshop de Liderança",
    price: 497.00,
    date: "2025-02-15",
    status: "denied",
    paymentDetails: {
      method: "credit_card",
      cardDetails: {
        brand: "visa",
        lastFourDigits: "4123",
        holderName: "CARLOS SILVA"
      },
      failureReason: "Cartão expirado"
    }
  },
];
