
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { mockAddresses } from "@/data/mockData";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddressSelection } from "./AddressSelection";

interface PaymentMethodFormData {
	cardNumber: string;
	expiry: string;
	cvc: string;
	cardName: string;
	cardType: string;
	isDefault: string;
}

export const AddNewPaymentMethodDialog = () => {
	const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id);
	const form = useForm<PaymentMethodFormData>({
		defaultValues: {
			cardNumber: "",
			expiry: "",
			cvc: "",
			cardName: "",
			cardType: "credit",
			isDefault: "no",
		},
	});

	const onSubmit = (data: PaymentMethodFormData) => {
		console.log("Payment method data:", data);
		console.log("Selected address:", selectedAddress);
		// Here you would handle the submission logic
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full">
					<PlusIcon className="mr-2 h-4 w-4" />
					Adicionar cartão de crédito/débito
				</Button>
			</DialogTrigger>
			<DialogContent className="md:max-w-md">
				<DialogHeader>
					<DialogTitle>Adicionar cartão de crédito/débito</DialogTitle>
					<DialogDescription>
						Adicione um novo cartão à sua conta.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-4"
					>
						<FormField
							control={form.control}
							name="cardNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Número do cartão</FormLabel>
									<FormControl>
										<Input
											placeholder="1234 5678 9012 3456"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="expiry"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Validade</FormLabel>
										<FormControl>
											<Input
												placeholder="MM/AA"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="cvc"
								render={({ field }) => (
									<FormItem>
										<FormLabel>CVC</FormLabel>
										<FormControl>
											<Input
												placeholder="123"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="cardName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome no cartão</FormLabel>
									<FormControl>
										<Input
											placeholder="Nome como aparece no cartão"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="cardType"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="credit">Crédito</SelectItem>
												<SelectItem value="debit">Débito</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="isDefault"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Padrão</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Sim/Não" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="yes">Sim</SelectItem>
												<SelectItem value="no">Não</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Separator />

						<AddressSelection
							selectedAddress={selectedAddress}
							setSelectedAddress={setSelectedAddress}
						/>

						<DialogFooter className="mt-4 flex flex-col gap-2 md:flex-row">
							<DialogTrigger asChild>
								<Button
									variant="outline"
									type="button"
								>
									Cancelar
								</Button>
							</DialogTrigger>
							<Button type="submit">Salvar</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
