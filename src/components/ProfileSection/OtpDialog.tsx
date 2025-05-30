import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const OtpDialog = ({
	isOpen,
	onOpenChange,
	verifyingField,
	contactValue,
	onVerificationComplete,
	onSwitchMethod,
}: {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	verifyingField: "email" | "phone";
	contactValue: string;
	onVerificationComplete: () => void;
	onSwitchMethod: () => void;
}) => {
	const [otpValue, setOtpValue] = useState("");

	const handleVerifyOtp = () => {
		if (otpValue.length === 6) {
			toast.success(
				`${verifyingField === "email" ? "E-mail" : "Telefone"} verificado com sucesso`,
			);
			onVerificationComplete();
			setOtpValue("");
		} else {
			toast.error("Por favor, insira o código completo");
		}
	};

	const resendCode = () => {
		toast.success(
			`Novo código enviado para o seu ${verifyingField === "email" ? "e-mail" : "telefone"}`,
		);
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogContent className="md:max-w-md">
				<DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
					<XIcon className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</DialogClose>
				<DialogHeader>
					<DialogTitle className="text-center font-semibold text-2xl">
						Confirmar {verifyingField}
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col space-y-6 py-4">
					<p className="text-center text-gray-700">
						Digite o código enviado para {contactValue}
					</p>
					<div className="flex justify-center">
						<InputOTP
							maxLength={6}
							value={otpValue}
							onChange={setOtpValue}
						>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					</div>
					<Button
						onClick={handleVerifyOtp}
						className="w-full"
					>
						Verificar {verifyingField === "email" ? "e-mail" : "telefone"}
					</Button>
					<Button
						variant="outline"
						onClick={resendCode}
						className="w-full"
					>
						Reenviar código
					</Button>
					<Button
						variant="ghost"
						onClick={onSwitchMethod}
						className="text-blue-600 text-sm hover:text-blue-800"
					>
						Não tem mais acesso a este
						{verifyingField === "email" ? "e-mail" : "telefone"}? Validar pelo
						{verifyingField === "email" ? "telefone" : "e-mail"}.
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
