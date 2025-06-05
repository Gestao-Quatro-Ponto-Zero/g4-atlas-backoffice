
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { User, CreateUserRequest, UpdateUserRequest } from "@/types/user";

interface UserFormProps {
	user?: User;
	onSubmit: (data: CreateUserRequest | UpdateUserRequest) => void;
	onCancel: () => void;
	isLoading?: boolean;
}

export const UserForm = ({ user, onSubmit, onCancel, isLoading }: UserFormProps) => {
	const form = useForm<CreateUserRequest>({
		defaultValues: {
			email: user?.email || "",
			name: user?.name || "",
			about: user?.about || "",
			job_title_id: user?.job_title_id || "",
			person_id: user?.person_id || "",
			status_id: user?.status_id || "",
			enabled: user?.enabled ?? true,
		},
	});

	const handleSubmit = (data: CreateUserRequest) => {
		onSubmit(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} type="email" required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input {...field} required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="about"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sobre</FormLabel>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="job_title_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ID do Cargo</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="person_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ID da Pessoa</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="status_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>ID do Status</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="enabled"
					render={({ field }) => (
						<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
							<div className="space-y-0.5">
								<FormLabel>Ativo</FormLabel>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="flex justify-end space-x-2">
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancelar
					</Button>
					<Button type="submit" disabled={isLoading}>
						{user ? "Atualizar" : "Criar"}
					</Button>
				</div>
			</form>
		</Form>
	);
};
