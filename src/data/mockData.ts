
// Mock data for development purposes
// This would be replaced with actual API calls in production

export interface User {
  id: string;
  name: string;
  email: string;
  documentNumber: string; // CPF
  phone: string;
}

export interface Order {
  id: string;
  productName: string;
  price: number;
  date: string;
  status: "pending" | "approved" | "denied";
  paymentMethod: string;
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
    paymentMethod: "Cartão de Crédito",
  },
  {
    id: "order2",
    productName: "Curso de Marketing Digital",
    price: 997.00,
    date: "2025-04-01",
    status: "pending",
    paymentMethod: "Boleto Bancário",
  },
  {
    id: "order3",
    productName: "Workshop de Liderança",
    price: 497.00,
    date: "2025-02-15",
    status: "denied",
    paymentMethod: "Cartão de Crédito",
  },
];
