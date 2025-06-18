import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { EditIcon } from "lucide-react";
import { useRef, useState } from "react";
import { UserEditModal } from "./UserEditModal";
import type { User } from "@/types/user";
import { cn } from "@/lib/utils";

export const UsersTable = ({
	users,
	pending,
}: { users: User[]; pending: boolean }) => {
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const modalRef = useRef<{ toggle: () => void } | null>(null);

	const handleEditUser = (user: User) => {
		setSelectedUser(user);
		modalRef.current?.toggle();
	};

	const handleCloseModal = () => {
		setSelectedUser(null);
	};

	return (
		<>
			<Table className={cn(pending && "opacity-50")}>
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
					{users.map(user => (
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
				onClose={handleCloseModal}
				ref={modalRef}
			/>
		</>
	);
};
