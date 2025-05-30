import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const PhoneDialog = ({
	isOpen,
	onOpenChange,
	initialPhone,
	onRequestVerification,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	initialPhone: string;
	onRequestVerification: () => void;
}) => {
	const [editPhone, setEditPhone] = useState(initialPhone);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="mb-4 text-center font-semibold text-2xl">
						Atualizar telefone
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<Input
						value={editPhone}
						onChange={e => setEditPhone(e.target.value)}
						placeholder="Telefone"
					/>
					<Button onClick={onRequestVerification}>Validar telefone</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
