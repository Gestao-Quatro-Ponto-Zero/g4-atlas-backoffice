import type { ReactNode } from "react";

export const CardFuncionalidadeFutura = ({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: ReactNode;
}) => {
	return (
		<div className="grid place-items-center gap-2 rounded-lg border-2 border-gray-200 border-dashed bg-gray-50 p-4 text-center">
			{icon}
			<h3 className="font-medium text-gray-400">{title}</h3>
			<p className="text-gray-400 text-xs">{description}</p>
		</div>
	);
};
