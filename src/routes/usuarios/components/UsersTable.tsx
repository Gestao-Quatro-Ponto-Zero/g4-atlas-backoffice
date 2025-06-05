
import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditIcon } from "lucide-react";
import { UserEditModal } from "./UserEditModal";
import type { User } from "@/types/user";

interface UsersTableProps {
	users: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleEditUser = (user: User) => {
		setSelectedUser(user);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setSelectedUser(null);
		setIsModalOpen(false);
	};

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Nome</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Criado em</TableHead>
						<TableHead>Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell className="font-medium">{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<Badge variant={user.enabled ? "default" : "secondary"}>
									{user.enabled ? "Ativo" : "Inativo"}
								</Badge>
							</TableCell>
							<TableCell>
								{user.created_at
									? new Date(user.created_at).toLocaleDateString("pt-BR")
									: "-"}
							</TableCell>
							<TableCell>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => handleEditUser(user)}
								>
									<EditIcon className="h-4 w-4" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<UserEditModal
				user={selectedUser}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</>
	);
};
