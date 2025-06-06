import {
	BarChart3Icon,
	PackageIcon,
	TrendingUpIcon,
	UsersIcon,
} from "lucide-react";
import { NumberCard } from "./NumberCard";

const numberCards = [
	{
		title: "Total Usuários",
		icon: <UsersIcon className="h-4 w-4 text-gray-300" />,
		value: "---",
		status: "Em desenvolvimento",
	},
	{
		title: "Produtos",
		icon: <PackageIcon className="h-4 w-4 text-gray-300" />,
		value: "---",
		status: "Em desenvolvimento",
	},
	{
		title: "Vendas",
		icon: <TrendingUpIcon className="h-4 w-4 text-gray-300" />,
		value: "R$ ---",
		status: "Em desenvolvimento",
	},
	{
		title: "Conversão",
		icon: <BarChart3Icon className="h-4 w-4 text-gray-300" />,
		value: "---",
		status: "Em desenvolvimento",
	},
];

export const NumberCards = () => {
	return (
		<div className="grid grid-cols-4 gap-4">
			{numberCards.map(card => (
				<NumberCard
					key={card.title}
					{...card}
				/>
			))}
		</div>
	);
};
