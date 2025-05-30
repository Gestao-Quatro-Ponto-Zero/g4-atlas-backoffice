import { Button } from "@/components/ui/button";
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
import { PlusIcon } from "lucide-react";
import { brazilianStates } from "./constants";

export const AddAddressDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full">
					<PlusIcon className="mr-2 h-4 w-4" />
					Adicionar novo endereço
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Adicionar endereço</DialogTitle>
					<DialogDescription>
						Adicione um novo endereço à sua conta
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="zipCode">CEP</Label>
						<Input
							id="zipCode"
							placeholder="CEP"
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="street">Endereço</Label>
						<Input
							id="street"
							placeholder="Rua, número"
						/>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="grid gap-2">
							<Label htmlFor="neighborhood">Bairro</Label>
							<Input
								id="neighborhood"
								placeholder="Bairro"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="city">Cidade</Label>
							<Input
								id="city"
								placeholder="Cidade"
							/>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="state">Estado</Label>
						<Select>
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
						<Switch id="isDefault" />
						<Label htmlFor="isDefault">Definir como endereço padrão</Label>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline">Cancelar</Button>
					<Button>Salvar endereço</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
