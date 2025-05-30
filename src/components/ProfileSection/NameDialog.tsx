import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

type NameDialogProps = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	initialName: string;
};

export const NameDialog = ({
	isOpen,
	onOpenChange,
	initialName,
}: NameDialogProps) => {
	const [editName, setEditName] = useState(initialName);

	const handleSaveName = () => {
		toast.success("Nome atualizado com sucesso");
		onOpenChange(false);
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="mb-4 text-center font-semibold text-2xl">
						Atualizar nome
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col space-y-4">
					<Input
						value={editName}
						onChange={e => setEditName(e.target.value)}
						placeholder="Nome completo"
					/>
					<Button onClick={handleSaveName}>Salvar</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
