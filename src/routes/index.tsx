import { CardsFuncionalidadesFuturas } from "@/components/CardsFuncionalidadesFuturas";
import { GraphicCards } from "@/components/GraphicCards";
import { NumberCards } from "@/components/NumberCards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
	component: () => {
		return (
			<div className="grid gap-4">
				<div>
					<h1 className="font-bold text-3xl">Dashboard</h1>
					<p className="text-base text-gray-600">Visão geral do sistema</p>
				</div>

				<NumberCards />

				<GraphicCards />

				<CardsFuncionalidadesFuturas />
			</div>
		);
	},
});
