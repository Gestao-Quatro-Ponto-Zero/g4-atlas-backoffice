import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { mockAddresses } from "@/data/mockData";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const AddressSelection = ({
	setSelectedAddress,
	selectedAddress,
}: {
	setSelectedAddress: (address: string) => void;
	selectedAddress: string;
}) => {
	const [useNewAddress, setUseNewAddress] = useState(false);

	return (
		<div className="mt-4 space-y-4">
			<h4 className="font-medium text-sm">Endereço de cobrança</h4>

			<RadioGroup
				value={useNewAddress ? "new" : "existing"}
				onValueChange={value => setUseNewAddress(value === "new")}
			>
				<div className="mb-3 flex items-start space-x-2">
					<RadioGroupItem
						value="existing"
						id="existing"
					/>
					<div className="grid gap-1.5">
						<label
							htmlFor="existing"
							className="font-medium text-sm"
						>
							Usar um endereço existente
						</label>
						{!useNewAddress && (
							<Select
								value={selectedAddress}
								onValueChange={setSelectedAddress}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Selecione um endereço" />
								</SelectTrigger>
								<SelectContent>
									{mockAddresses.map(address => (
										<SelectItem
											key={address.id}
											value={address.id}
										>
											{address.street}, {address.city}/{address.state}
											{address.isDefault && " (Padrão)"}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
						<div className="mt-1 flex justify-between">
							<Link
								to="/enderecos"
								className="text-blue-600 text-xs hover:underline"
							>
								Gerenciar endereços
							</Link>
						</div>
					</div>
				</div>

				<div className="flex items-start space-x-2">
					<RadioGroupItem
						value="new"
						id="new"
					/>
					<div className="grid w-full gap-1.5">
						<label
							htmlFor="new"
							className="font-medium text-sm"
						>
							Adicionar novo endereço
						</label>
						{useNewAddress && (
							<div className="mt-2 grid grid-cols-1 gap-4">
								<Input placeholder="Endereço (rua, número)" />
								<div className="grid grid-cols-2 gap-3">
									<Input placeholder="Bairro" />
									<Input placeholder="Cidade" />
								</div>
								<div className="grid grid-cols-2 gap-3">
									<Input placeholder="Estado" />
									<Input placeholder="CEP" />
								</div>
							</div>
						)}
					</div>
				</div>
			</RadioGroup>
		</div>
	);
};
