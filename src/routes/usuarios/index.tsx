import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsers } from "@/hooks/useUsers";
import { createFileRoute } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { use, useState } from "react";
import { UsersPagination } from "./components/UsersPagination";
import { UsersTable } from "./components/UsersTable";

export const Route = createFileRoute("/_layout/usuarios")({
	component: () => {
		const [currentPage, setCurrentPage] = useState(1);
		const [filters, setFilters] = useState({
			email: "",
			name: "",
		});
		const [searchFilters, setSearchFilters] = useState({
			email: "",
			name: "",
		});

		const { promise } = useUsers({
			page: currentPage,
			limit: 10,
			email: searchFilters.email || undefined,
			name: searchFilters.name || undefined,
			sort: "id,ASC",
		});

		const usersData = use(promise);

		const handleSearch = () => {
			setSearchFilters(filters);
			setCurrentPage(1);
		};

		const handlePageChange = (page: number) => {
			setCurrentPage(page);
		};

		return (
			<main className="mx-auto w-full max-w-[1200px] px-2 md:px-0">
				<section className="grid gap-5">
					<header className="text-center md:text-left">
						<h1 className="font-bold text-2xl md:text-3xl">Usuários</h1>
						<p className="text-gray-600 text-sm md:text-base">
							Gerencie os usuários do sistema
						</p>
					</header>

					<section className="grid gap-6 rounded-lg bg-white p-4 shadow-xs md:p-6">
						{/* Filtros de busca */}
						<form
							action={handleSearch}
							className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto]"
						>
							<Input
								placeholder="Buscar por email..."
								value={filters.email}
								onChange={e =>
									setFilters(prev => ({ ...prev, email: e.target.value }))
								}
							/>
							<Input
								placeholder="Buscar por nome..."
								value={filters.name}
								onChange={e =>
									setFilters(prev => ({ ...prev, name: e.target.value }))
								}
							/>
							<Button
								onClick={handleSearch}
								className="grid grid-cols-[auto_1fr] items-center gap-2"
							>
								<SearchIcon className="h-4 w-4" />
								Buscar
							</Button>
						</form>

						{/* Tabela de usuários */}
						{usersData?.content && usersData.content.length > 0 ? (
							<div className="grid gap-6">
								<UsersTable users={usersData.content} />

								{/* Paginação */}
								{usersData.totalPages > 1 && (
									<nav className="flex justify-center">
										<UsersPagination
											currentPage={currentPage}
											totalPages={usersData.totalPages}
											onPageChange={handlePageChange}
										/>
									</nav>
								)}

								<p className="text-center text-gray-500 text-sm">
									Mostrando {usersData.content.length} de
									{usersData.totalElements} usuários
								</p>
							</div>
						) : (
							<p className="py-8 text-center text-gray-500">
								{searchFilters.email || searchFilters.name
									? "Nenhum usuário encontrado com os filtros aplicados."
									: "Nenhum usuário encontrado."}
							</p>
						)}
					</section>
				</section>
			</main>
		);
	},
});
