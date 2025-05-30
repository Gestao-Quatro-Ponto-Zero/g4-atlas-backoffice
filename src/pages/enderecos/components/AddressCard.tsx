import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Address } from "@/data/mockData";
import { CheckIcon, EditIcon, MapPinIcon, Trash2Icon } from "lucide-react";
import { brazilianStates } from "./constants";

export const AddressCard = ({ address }: { address: Address }) => {
	const { street, neighborhood, city, state, zipCode, isDefault } = address;

	return (
		<Card className="relative">
			<CardContent className="p-5">
				<div className="flex justify-between">
					<div className="space-y-1">
						<div className="flex items-center space-x-2">
							<MapPinIcon className="h-4 w-4 text-gray-500" />
							<span className="font-medium">{street}</span>
						</div>
						<p className="text-gray-500 text-sm">{neighborhood}</p>
						<p className="text-gray-500 text-sm">
							{city}, {state} - {zipCode}
						</p>

						{isDefault && (
							<div className="mt-2 flex items-center space-x-1">
								<span className="flex items-center rounded bg-blue-50 px-2 py-0.5 text-blue-700 text-xs">
									<CheckIcon className="mr-1 h-3 w-3" />
									Padrão
								</span>
							</div>
						)}
					</div>

					<div className="flex flex-col space-y-2">
						<Dialog>
							<DialogTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
								>
									<EditIcon className="h-4 w-4" />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Editar endereço</DialogTitle>
									<DialogDescription>
										Atualize as informações do seu endereço
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<Label htmlFor="zipCode">CEP</Label>
										<Input
											id="zipCode"
											defaultValue={zipCode}
										/>
									</div>

									<div className="grid gap-2">
										<Label htmlFor="street">Endereço</Label>
										<Input
											id="street"
											defaultValue={street}
										/>
									</div>
									<div className="grid grid-cols-2 gap-3">
										<div className="grid gap-2">
											<Label htmlFor="neighborhood">Bairro</Label>
											<Input
												id="neighborhood"
												defaultValue={neighborhood}
											/>
										</div>
										<div className="grid gap-2">
											<Label htmlFor="city">Cidade</Label>
											<Input
												id="city"
												defaultValue={city}
											/>
										</div>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="state">Estado</Label>
										<Select defaultValue={state}>
											<SelectTrigger id="state">
												<SelectValue placeholder="Selecione o estado" />
											</SelectTrigger>
											<SelectContent>
												{brazilianStates.map(state => (
													<SelectItem
														key={state.value}
														value={state.value}
													>
														{state.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="flex items-center space-x-2 pt-2">
										<Switch
											id="isDefault"
											defaultChecked={isDefault}
										/>
										<Label htmlFor="isDefault">
											Definir como endereço padrão
										</Label>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline">Cancelar</Button>
									<Button>Salvar alterações</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>

						<Button
							variant="ghost"
							size="icon"
							className="h-8 w-8 text-red-500"
						>
							<Trash2Icon className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
