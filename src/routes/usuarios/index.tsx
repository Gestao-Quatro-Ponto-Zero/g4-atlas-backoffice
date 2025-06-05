
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { UsersTable } from "./components/UsersTable";
import { UsersPagination } from "./components/UsersPagination";
import { Spinner } from "@/components/Spinner";

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

		const { data: usersData, isLoading, error } = useUsers({
			page: currentPage,
			size: 10,
			email: searchFilters.email || undefined,
			name: searchFilters.name || undefined,
			sort: "id,ASC",
		});

		const handleSearch = () => {
			setSearchFilters(filters);
			setCurrentPage(1);
		};

		const handlePageChange = (page: number) => {
			setCurrentPage(page);
		};

		const handleKeyPress = (e: React.KeyboardEvent) => {
			if (e.key === "Enter") {
				handleSearch();
			}
		};

		if (isLoading) {
			return (
				<div className="mx-auto w-full max-w-[1200px] px-2 md:px-0">
					<div className="flex items-center justify-center py-8">
						<Spinner />
					</div>
				</div>
			);
		}

		if (error) {
			return (
				<div className="mx-auto w-full max-w-[1200px] px-2 md:px-0">
					<div className="mb-5 text-center md:text-left">
						<h1 className="font-bold text-2xl md:text-3xl">Usuários</h1>
						<p className="text-gray-600 text-sm md:text-base">
							Gerencie os usuários do sistema
						</p>
					</div>
					<div className="rounded-lg bg-white p-4 shadow-xs md:p-6">
						<p className="py-8 text-center text-red-500">
							Erro ao carregar usuários: {error.message}
						</p>
					</div>
				</div>
			);
		}

		return (
			<div className="mx-auto w-full max-w-[1200px] px-2 md:px-0">
				<div className="mb-5 text-center md:text-left">
					<h1 className="font-bold text-2xl md:text-3xl">Usuários</h1>
					<p className="text-gray-600 text-sm md:text-base">
						Gerencie os usuários do sistema
					</p>
				</div>

				<div className="rounded-lg bg-white p-4 shadow-xs md:p-6">
					{/* Filtros de busca */}
					<div className="mb-6 space-y-4">
						<div className="flex flex-col gap-4 md:flex-row">
							<div className="flex-1">
								<Input
									placeholder="Buscar por email..."
									value={filters.email}
									onChange={(e) => setFilters(prev => ({ ...prev, email: e.target.value }))}
									onKeyPress={handleKeyPress}
								/>
							</div>
							<div className="flex-1">
								<Input
									placeholder="Buscar por nome..."
									value={filters.name}
									onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
									onKeyPress={handleKeyPress}
								/>
							</div>
							<Button onClick={handleSearch} className="flex items-center gap-2">
								<SearchIcon className="h-4 w-4" />
								Buscar
							</Button>
						</div>
					</div>

					{/* Tabela de usuários */}
					{usersData?.content && usersData.content.length > 0 ? (
						<>
							<UsersTable users={usersData.content} />
							
							{/* Paginação */}
							{usersData.totalPages > 1 && (
								<div className="mt-6 flex justify-center">
									<UsersPagination
										currentPage={currentPage}
										totalPages={usersData.totalPages}
										onPageChange={handlePageChange}
									/>
								</div>
							)}

							{/* Informações da paginação */}
							<div className="mt-4 text-center text-sm text-gray-500">
								Mostrando {usersData.content.length} de {usersData.totalElements} usuários
							</div>
						</>
					) : (
						<div className="py-8 text-center text-gray-500">
							{searchFilters.email || searchFilters.name
								? "Nenhum usuário encontrado com os filtros aplicados."
								: "Nenhum usuário encontrado."}
						</div>
					)}
				</div>
			</div>
		);
	},
});
