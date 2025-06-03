import { Button } from "@/components/ui/button";
import type { Order } from "@/data/mockData";
import { useNavigate } from "@tanstack/react-router";
import { ExternalLinkIcon, MessageCircleIcon } from "lucide-react";

export const OrderActions = ({ orderId }: { orderId: Order["id"] }) => {
	const navigate = useNavigate();

	const handleAccessProducts = () => {
		window.open(
			"https://platform.g4educacao.com/programs?tab=my_programs",
			"_blank",
		);
	};

	const handleViewPaymentHistory = () => {
		navigate({ to: "/contas", search: { order: orderId } });
	};

	const handleContactSupport = () => {
		const supportPhoneNumber = "5511942100072";
		const message = encodeURIComponent(
			`Olá, gostaria de ajuda com meu pedido #${orderId}`,
		);
		window.open(
			`https://wa.me/${supportPhoneNumber}?text=${message}`,
			"_blank",
		);
	};

	return (
		<div className="space-y-4">
			<div className="flex justify-between gap-2">
				<Button
					onClick={handleAccessProducts}
					variant="outline"
					size="sm"
					className="flex items-center gap-2"
				>
					Acessar Produtos
					<ExternalLinkIcon className="h-3.5 w-3.5" />
				</Button>
				<Button
					onClick={handleViewPaymentHistory}
					variant="outline"
					size="sm"
					className="flex items-center gap-2"
				>
					Histórico de Pagamento
					<ExternalLinkIcon className="h-3.5 w-3.5" />
				</Button>
			</div>
			<Button
				onClick={handleContactSupport}
				variant="ghost"
				className="w-full"
			>
				<MessageCircleIcon className="mr-2 h-4 w-4" />
				Falar com o Suporte
			</Button>
		</div>
	);
};
