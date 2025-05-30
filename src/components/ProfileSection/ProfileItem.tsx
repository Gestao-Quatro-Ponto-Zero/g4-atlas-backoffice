import { ChevronRightIcon } from "lucide-react";

export const ProfileItem = ({
	label,
	value,
	onClick,
}: { label: string; value: string; onClick: () => void }) => {
	return (
		<button
			type="button"
			className="flex cursor-pointer items-center justify-between py-4 hover:bg-gray-50"
			onClick={onClick}
		>
			<div className="text-gray-500 text-sm">{label}</div>
			<div className="flex items-center">
				<span className="mr-2 text-gray-900">{value}</span>
				<ChevronRightIcon className="h-4 w-4 text-gray-400" />
			</div>
		</button>
	);
};
