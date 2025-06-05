
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "./UserForm";
import { useUpdateUser } from "@/hooks/useUsers";
import type { User, UpdateUserRequest } from "@/types/user";

interface UserEditModalProps {
	user: User | null;
	isOpen: boolean;
	onClose: () => void;
}

export const UserEditModal = ({ user, isOpen, onClose }: UserEditModalProps) => {
	const updateUserMutation = useUpdateUser();

	const handleSubmit = (data: UpdateUserRequest) => {
		if (!user) return;
		
		updateUserMutation.mutate(
			{ id: user.id, ...data },
			{
				onSuccess: () => {
					onClose();
				},
			}
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Editar Usuário</DialogTitle>
				</DialogHeader>
				{user && (
					<UserForm
						user={user}
						onSubmit={handleSubmit}
						onCancel={onClose}
						isLoading={updateUserMutation.isPending}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
