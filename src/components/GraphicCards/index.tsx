import { GraphicCard } from "./GraphicCard";

const graphicCards = [
	{
		title: "Vendas por Mês",
	},
	{
		title: "Atividade por Categoria",
	},
];

export const GraphicCards = () => {
	return (
		<div className="grid grid-cols-2 gap-6">
			{graphicCards.map(card => (
				<GraphicCard
					key={card.title}
					{...card}
				/>
			))}
		</div>
	);
};
