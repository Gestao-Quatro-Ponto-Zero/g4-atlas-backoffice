import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3Icon, PackageIcon, UsersIcon } from "lucide-react";
import { CardFuncionalidadeFutura } from "./CardFuncionalidadeFutura";

const cardsFuncionalidadesFuturas = [
	{
		title: "Gestão de Usuários",
		description: "Cadastro e controle de usuários",
		icon: <UsersIcon className="h-8 w-8 text-gray-300" />,
	},
	{
		title: "Catálogo de Produtos",
		description: "Gerenciamento de produtos",
		icon: <PackageIcon className="h-8 w-8 text-gray-300" />,
	},
	{
		title: "Relatórios Avançados",
		description: "Analytics e insights detalhados",
		icon: <BarChart3Icon className="h-8 w-8 text-gray-300" />,
	},
];

export const CardsFuncionalidadesFuturas = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-400">Funcionalidades Futuras</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{cardsFuncionalidadesFuturas.map(card => (
						<CardFuncionalidadeFutura
							key={card.title}
							{...card}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
