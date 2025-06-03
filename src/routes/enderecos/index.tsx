import { useAuth } from "@/contexts/AuthContext";
import { mockAddresses } from "@/data/mockData";
import { createFileRoute } from "@tanstack/react-router";
import { use } from "react";
import { AddAddressDialog } from "./components/AddAddressDialog";
import { AddressCard } from "./components/AddressCard";

export const Route = createFileRoute("/_layout/enderecos")({
	component: () => {
		const { promise } = useAuth();
		const user = use(promise);

		if (!user) {
			return (
				<div className="flex flex-col items-center justify-center px-4 py-8">
					<div className="mb-6 text-center">
						<h1 className="font-bold text-2xl">
							Entre para acessar seus endereços
						</h1>
						<p className="mx-auto mt-2 max-w-md text-gray-600">
							Faça login para visualizar e gerenciar seus endereços
						</p>
					</div>
				</div>
			);
		}

		return (
			<div className="mx-auto w-full max-w-[900px] px-2 md:px-0">
				<div className="mb-5 text-center md:text-left">
					<h1 className="font-bold text-2xl md:text-3xl">Meus Endereços</h1>
					<p className="text-gray-600 text-sm md:text-base">
						Gerencie seus endereços
					</p>
				</div>

				<div className="rounded-lg bg-white p-4 shadow-xs md:p-6">
					<div className="mb-6">
						<h2 className="mb-4 font-medium text-lg">Endereços cadastrados</h2>

						<div className="grid grid-cols-1 gap-4">
							{mockAddresses.map(address => (
								<AddressCard
									key={address.id}
									address={address}
								/>
							))}
						</div>

						<div className="mt-6">
							<AddAddressDialog />
						</div>
					</div>

					<div className="border-gray-100 border-t pt-4">
						<h3 className="mb-2 font-medium text-gray-700 text-sm">
							Informações adicionais
						</h3>
						<p className="text-gray-500 text-sm">
							Os endereços são usados apenas para fins de faturamento associados
							aos métodos de pagamento. Não enviamos correspondência física para
							estes endereços.
						</p>
					</div>
				</div>
			</div>
		);
	},
});
