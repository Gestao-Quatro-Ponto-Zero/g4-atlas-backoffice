import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/hooks/useUsers";
import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { useDeferredValue, useTransition } from "react";
import { z } from "zod";
import { UsersPagination } from "./components/UsersPagination";
import { UsersTable } from "./components/UsersTable";

export const Route = createFileRoute("/_layout/usuarios")({
	validateSearch: z.object({
		email: z.string().optional(),
		name: z.string().optional(),
		page: z.number().optional(),
	}),
	component: () => {
		const { email, name, page = 1 } = useDeferredValue(Route.useSearch());
		const navigate = Route.useNavigate();

		const [pending, startTransition] = useTransition();

		const { data: usersData } = useUsers({
			page,
			email,
			name,
			sort: "id,ASC",
		});

		const handleSearch = (formData: FormData) => {
			startTransition(() => {
				navigate({
					replace: true,
					search: {
						email: formData.get("email") as string,
						name: formData.get("name") as string,
					},
				});
			});
		};

		const handlePageChange = (page: number) => {
			startTransition(() => {
				navigate({
					replace: true,
					search: prev => ({
						...prev,
						page,
					}),
				});
			});
		};

		return (
			<section className="grid gap-5">
				<header className="text-center md:text-left">
					<h1 className="font-bold text-2xl md:text-3xl">Usuários</h1>
					<p className="text-gray-600 text-sm md:text-base">
						Gerencie os usuários do sistema
					</p>
				</header>

				<section className="grid gap-6 h-full rounded-lg bg-white p-4 shadow-xs md:p-6">
					{/* Filtros de busca */}
					<form
						action={handleSearch}
						className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]"
					>
						<Input
							name="email"
							defaultValue={email}
							placeholder="Buscar por email..."
						/>
						<Input
							name="name"
							defaultValue={name}
							placeholder="Buscar por nome..."
						/>
						<Button className="grid grid-cols-[auto_1fr] items-center gap-2">
							<SearchIcon className="h-4 w-4" />
							Buscar
						</Button>
					</form>

					{/* Tabela de usuários */}
					{usersData?.content && usersData.content.length > 0 ? (
						<div className="grid grid-rows-[1fr_auto] gap-6">
							<UsersTable
								pending={pending}
								users={usersData.content}
							/>

							{/* Paginação */}
							{!!usersData.page?.total_pages && (
								<nav className="flex justify-center">
									<UsersPagination
										totalPages={usersData.page?.total_pages}
										onPageChange={handlePageChange}
									/>
								</nav>
							)}

							<p className="text-center text-gray-500 text-sm">
								Mostrando {usersData.content.length} de{" "}
								{usersData.page?.total_elements} usuários
							</p>
						</div>
					) : (
						<p className="py-8 text-center text-gray-500">
							{email || name
								? "Nenhum usuário encontrado com os filtros aplicados."
								: "Nenhum usuário encontrado."}
						</p>
					)}
				</section>
			</section>
		);
	},
});
