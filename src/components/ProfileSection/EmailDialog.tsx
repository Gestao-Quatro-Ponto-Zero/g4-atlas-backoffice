import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const EmailDialog = ({
	isOpen,
	onOpenChange,
	initialEmail,
	onRequestVerification,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	initialEmail: string;
	onRequestVerification: () => void;
}) => {
	const [editEmail, setEditEmail] = useState(initialEmail);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="mb-4 text-center font-semibold text-2xl">
						Atualizar e-mail
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<Input
						type="email"
						value={editEmail}
						onChange={e => setEditEmail(e.target.value)}
						placeholder="E-mail"
					/>
					<Button onClick={onRequestVerification}>Validar e-mail</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
