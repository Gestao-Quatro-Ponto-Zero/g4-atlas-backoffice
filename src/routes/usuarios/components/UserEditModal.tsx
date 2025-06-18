import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateUser } from "@/hooks/useUsers";
import type { UpdateUserRequest, User } from "@/types/user";
import { UserForm } from "./UserForm";
import {
	useCallback,
	useImperativeHandle,
	useState,
	type RefObject,
} from "react";

export const UserEditModal = ({
	user,
	onClose,
	ref,
}: {
	user: User;
	onClose: () => void;
	ref: RefObject<{ toggle: () => void }>;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const updateUserMutation = useUpdateUser();

	useImperativeHandle(
		ref,
		useCallback(
			() => ({
				toggle: () => setIsOpen(prev => !prev),
			}),
			[],
		),
	);

	const handleSubmit = (data: UpdateUserRequest) => {
		if (!user) return;

		updateUserMutation.mutate(
			{ id: user.id, ...data },
			{
				onSuccess: () => {
					onClose();
				},
			},
		);
	};

	const handleClose = () => {
		setIsOpen(false);
		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Editar Usuário</DialogTitle>
				</DialogHeader>
				{user && (
					<UserForm
						user={user}
						onSubmit={handleSubmit}
						onCancel={handleClose}
						isLoading={updateUserMutation.isPending}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
};
