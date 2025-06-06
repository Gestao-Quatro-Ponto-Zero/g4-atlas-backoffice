import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3Icon, ClockIcon } from "lucide-react";

export const GraphicCard = ({ title }: { title: string }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gray-400">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid h-64 place-content-center rounded-lg border-2 border-gray-200 border-dashed bg-gray-50">
					<div className="grid place-items-center gap-2 text-center">
						<BarChart3Icon className="h-12 w-12 text-gray-300" />
						<p className="text-gray-400 text-sm">Gráfico será implementado</p>
						<div className="grid grid-flow-col place-items-center gap-1">
							<ClockIcon className="h-3 w-3 text-yellow-500" />
							<span className="text-xs text-yellow-600">Em breve</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
