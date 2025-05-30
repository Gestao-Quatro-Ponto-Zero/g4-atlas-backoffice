import type { PaymentCard } from "@/data/mockData";

export const CardBrandIcon = ({ brand }: { brand: PaymentCard["brand"] }) => {
	if (brand === "mastercard") {
		return (
			<div className="flex h-6 w-8 items-center justify-center rounded bg-[#FF5F00]">
				<div className="-mr-1 h-3 w-3 rounded-full bg-[#EB001B] opacity-85" />
				<div className="-ml-1 h-3 w-3 rounded-full bg-[#F79E1B] opacity-85" />
			</div>
		);
	}
	if (brand === "visa") {
		return (
			<div className="flex h-6 w-8 items-center justify-center rounded border border-blue-200 bg-blue-100 text-blue-700">
				<span className="font-bold text-[10px]">VISA</span>
			</div>
		);
	}
	return null;
};
