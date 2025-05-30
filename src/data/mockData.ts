export interface PaymentDetails {
	id: string;
	method: string;
	amount: number;
	cardDetails?: {
		brand: string;
		lastFourDigits: string;
		type: "credit" | "debit";
		isRecurring?: boolean;
	};
	installments?: number;
	receiptUrl?: string;
	isRecurring?: boolean;
	orderId?: string; // Added to link payments to orders
}

export interface Product {
	name: string;
	price: number;
	quantity: number;
}

export interface Order {
	id: string;
	date: string;
	productName: string; // For backward compatibility
	price: number;
	status: "approved" | "pending" | "denied";
	payments: PaymentDetails[];
	products?: Product[]; // Add structured products array
	contract?: Contract; // Added contract information
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
	type: "credit" | "debit";
	brand: string;
	lastFourDigits: string;
	expiryDate: string;
	holderName: string;
	isDefault?: boolean;
	addressId?: string; // Added missing property
	nickname?: string; // Added missing property
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

// Interface for Charge data
export interface Charge {
	id: string;
	description: string;
	amount: number;
	dueDate: string;
	status: "pago" | "pendente" | "vencido" | "cancelado";
	paymentMethod?: string;
	orderId?: string;
	documentUrl?: string;
}

// Mock user data
export const mockUser: User = {
	id: "usr-001",
	name: "João Silva",
	email: "joao.silva@example.com",
	avatar: "https://i.pravatar.cc/300",
	phone: "(11) 98765-4321",
};

// Mock payment cards data
export const mockCards: PaymentCard[] = [
	{
		id: "card-001",
		type: "credit",
		brand: "mastercard",
		lastFourDigits: "4321",
		expiryDate: "12/25",
		holderName: "JOAO SILVA",
		isDefault: true,
		addressId: "addr-001", // Adding reference to the default address
		nickname: "Cartão Principal",
	},
	{
		id: "card-002",
		type: "credit",
		brand: "visa",
		lastFourDigits: "5678",
		expiryDate: "06/26",
		holderName: "JOAO SILVA",
		addressId: "addr-002", // Adding reference to the work address
		nickname: "Cartão Trabalho",
	},
];

// Mock addresses data
export const mockAddresses: Address[] = [
	{
		id: "addr-001",
		name: "Casa",
		street: "Rua das Flores",
		number: "123",
		neighborhood: "Jardim Primavera",
		city: "São Paulo",
		state: "SP",
		zipCode: "01234-567",
		isDefault: true,
	},
	{
		id: "addr-002",
		name: "Trabalho",
		street: "Avenida Paulista",
		number: "1500",
		complement: "Sala 203",
		neighborhood: "Bela Vista",
		city: "São Paulo",
		state: "SP",
		zipCode: "01310-200",
	},
];

// Mock charges data
export const mockCharges: Charge[] = [
	{
		id: "CHG001",
		description: "Mensalidade Curso de Marketing Digital",
		amount: 199.9,
		dueDate: "2025-05-10T00:00:00",
		status: "vencido",
		paymentMethod: "boleto",
		orderId: "ORD7831",
		documentUrl: "https://example.com/boleto/CHG001.pdf",
	},
	{
		id: "CHG002",
		description: "Mensalidade Assinatura Premium",
		amount: 59.9,
		dueDate: "2025-05-25T00:00:00",
		status: "pendente",
		paymentMethod: "boleto",
		orderId: "ORD7830",
		documentUrl: "https://example.com/boleto/CHG002.pdf",
	},
	{
		id: "CHG003",
		description: "Parcela 1/12 - MBA em Gestão de Projetos",
		amount: 999.99,
		dueDate: "2025-06-05T00:00:00",
		status: "pendente",
		paymentMethod: "boleto",
		orderId: "ORD7835",
		documentUrl: "https://example.com/boleto/CHG003.pdf",
	},
	{
		id: "CHG004",
		description: "Parcela 2/12 - MBA em Gestão de Projetos",
		amount: 999.99,
		dueDate: "2025-07-05T00:00:00",
		status: "pendente",
		orderId: "ORD7835",
	},
	{
		id: "CHG005",
		description: "Mensalidade Curso de Excel Avançado",
		amount: 199.9,
		dueDate: "2025-05-15T00:00:00",
		status: "pago",
		paymentMethod: "credit_card",
		orderId: "ORD7833",
	},
];

export interface Contract {
	id: string;
	type: string;
	startDate: string;
	endDate?: string;
	status: "active" | "pending" | "expired" | "canceled";
	documentUrl?: string;
	automaticRenewal?: boolean;
	description?: string;
}

export const mockOrders: Order[] = [
	{
		id: "ORD7829",
		date: "2025-05-15T10:30:00",
		productName: "Curso de Programação Java, Curso de Python Avançado",
		price: 399.9,
		status: "approved",
		payments: [
			{
				id: "PAY1234",
				method: "credit_card",
				amount: 399.9,
				cardDetails: {
					brand: "mastercard",
					lastFourDigits: "4321",
					type: "credit",
				},
				installments: 3,
				receiptUrl: "https://example.com/receipt/1234",
				orderId: "ORD7829",
			},
		],
		products: [
			{
				name: "Curso de Programação Java",
				price: 199.95,
				quantity: 1,
			},
			{
				name: "Curso de Python Avançado",
				price: 199.95,
				quantity: 1,
			},
		],
	},
	{
		id: "ORD7830",
		date: "2025-05-14T14:45:00",
		productName: "Assinatura Premium",
		price: 59.9,
		status: "pending",
		payments: [
			{
				id: "PAY1235",
				method: "boleto",
				amount: 59.9,
				installments: 1,
				orderId: "ORD7830",
			},
		],
		products: [
			{
				name: "Assinatura Premium",
				price: 59.9,
				quantity: 1,
			},
		],
	},
	{
		id: "ORD7831",
		date: "2025-05-10T09:15:00",
		productName:
			"Curso de Marketing Digital, E-book Marketing nas Redes Sociais, Mentoria Individual",
		price: 899.9,
		status: "denied",
		payments: [
			{
				id: "PAY1236",
				method: "credit_card",
				amount: 449.95,
				cardDetails: {
					brand: "visa",
					lastFourDigits: "5678",
					type: "credit",
				},
				installments: 2,
				orderId: "ORD7831",
			},
			{
				id: "PAY1237",
				method: "pix",
				amount: 449.95,
				orderId: "ORD7831",
			},
		],
		products: [
			{
				name: "Curso de Marketing Digital",
				price: 399.9,
				quantity: 1,
			},
			{
				name: "E-book Marketing nas Redes Sociais",
				price: 49.9,
				quantity: 1,
			},
			{
				name: "Mentoria Individual",
				price: 450.1,
				quantity: 2,
			},
		],
	},
	{
		id: "ORD7832",
		date: "2025-05-18T08:20:00",
		productName:
			"Workshop de Desenvolvimento Web, Curso de UX/UI Design, Kit de Ferramentas para Desenvolvedor",
		price: 1299.9,
		status: "approved",
		payments: [
			{
				id: "PAY1238",
				method: "credit_card",
				amount: 1299.9,
				cardDetails: {
					brand: "mastercard",
					lastFourDigits: "9876",
					type: "credit",
				},
				installments: 12,
				receiptUrl: "https://example.com/receipt/1238",
				orderId: "ORD7832",
			},
		],
		products: [
			{
				name: "Workshop de Desenvolvimento Web",
				price: 599.9,
				quantity: 1,
			},
			{
				name: "Curso de UX/UI Design",
				price: 499.9,
				quantity: 1,
			},
			{
				name: "Kit de Ferramentas para Desenvolvedor",
				price: 200.1,
				quantity: 1,
			},
		],
	},
	{
		id: "ORD7833",
		date: "2025-05-17T16:35:00",
		productName:
			"Curso de Excel Avançado, Curso de PowerBI, Curso de SQL para Análise de Dados",
		price: 599.7,
		status: "pending",
		payments: [
			{
				id: "PAY1239",
				method: "boleto",
				amount: 599.7,
				installments: 3,
				orderId: "ORD7833",
			},
		],
		products: [
			{
				name: "Curso de Excel Avançado",
				price: 199.9,
				quantity: 1,
			},
			{
				name: "Curso de PowerBI",
				price: 199.9,
				quantity: 1,
			},
			{
				name: "Curso de SQL para Análise de Dados",
				price: 199.9,
				quantity: 1,
			},
		],
	},
	{
		id: "ORD7834",
		date: "2025-05-20T11:30:00",
		productName: "Programa de Mentoria Anual, Acesso Premium à Plataforma",
		price: 2499.9,
		status: "approved",
		payments: [
			{
				id: "PAY1240",
				method: "credit_card",
				amount: 2499.9,
				cardDetails: {
					brand: "visa",
					lastFourDigits: "3456",
					type: "credit",
					isRecurring: true,
				},
				installments: 12,
				receiptUrl: "https://example.com/receipt/1240",
				isRecurring: true,
				orderId: "ORD7834",
			},
		],
		products: [
			{
				name: "Programa de Mentoria Anual",
				price: 1999.9,
				quantity: 1,
			},
			{
				name: "Acesso Premium à Plataforma",
				price: 500.0,
				quantity: 1,
			},
		],
		contract: {
			id: "CTR001",
			type: "assinatura",
			startDate: "2025-05-20T00:00:00",
			endDate: "2026-05-20T00:00:00",
			status: "active",
			documentUrl: "https://example.com/contracts/CTR001.pdf",
			automaticRenewal: true,
			description: "Contrato de assinatura anual com renovação automática",
		},
	},
	{
		id: "ORD7835",
		date: "2025-05-21T09:45:00",
		productName: "MBA em Gestão de Projetos",
		price: 11999.9,
		status: "pending",
		payments: [
			{
				id: "PAY1241",
				method: "boleto",
				amount: 11999.9,
				installments: 12,
				orderId: "ORD7835",
			},
		],
		products: [
			{
				name: "MBA em Gestão de Projetos",
				price: 11999.9,
				quantity: 1,
			},
		],
		contract: {
			id: "CTR002",
			type: "educacional",
			startDate: "2025-06-01T00:00:00",
			endDate: "2027-06-01T00:00:00",
			status: "pending",
			documentUrl: "https://example.com/contracts/CTR002.pdf",
			automaticRenewal: false,
			description:
				"Contrato educacional pendente de assinatura. Por favor, assine o contrato para liberar o acesso ao curso.",
		},
	},
];
