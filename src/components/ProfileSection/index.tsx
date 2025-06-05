
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { use, useState } from "react";
import { toast } from "sonner";
import { EmailDialog } from "./EmailDialog";
import { NameDialog } from "./NameDialog";
import { OtpDialog } from "./OtpDialog";
import { PhoneDialog } from "./PhoneDialog";
import { ProfileItem } from "./ProfileItem";

export const ProfileSection = () => {
	const { promise } = useAuth();
	const userData = use(promise);

	const [isNameDialogOpen, setIsNameDialogOpen] = useState(false);
	const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
	const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
	const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
	const [verifyingField, setVerifyingField] = useState<
		"email" | "phone" | null
	>(null);

	const handleRequestVerification = (type: "email" | "phone") => {
		setVerifyingField(type);
		if (type === "email") {
			setIsEmailDialogOpen(false);
		} else {
			setIsPhoneDialogOpen(false);
		}
		setIsOtpDialogOpen(true);
		toast.success(
			`Código de verificação enviado para o seu ${type === "email" ? "e-mail" : "telefone"}`,
		);
	};

	const handleVerificationComplete = () => {
		setIsOtpDialogOpen(false);
		setVerifyingField(null);
	};

	const handleSwitchVerificationMethod = () => {
		const newMethod = verifyingField === "email" ? "phone" : "email";
		setVerifyingField(newMethod);
		toast.success(
			`Código de verificação enviado para o seu ${newMethod === "email" ? "e-mail" : "telefone"}`,
		);
	};

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0">
				<CardTitle className="text-xl">Dados Pessoais</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-0 divide-y">
					<ProfileItem
						label="Nome"
						value={userData?.name || ""}
						onClick={() => setIsNameDialogOpen(true)}
					/>
					<ProfileItem
						label="E-mail"
						value={userData?.email || ""}
						onClick={() => setIsEmailDialogOpen(true)}
					/>
					<ProfileItem
						label="Telefone"
						value={userData?.phone || ""}
						onClick={() => setIsPhoneDialogOpen(true)}
					/>
				</div>
			</CardContent>

			<NameDialog
				isOpen={isNameDialogOpen}
				onOpenChange={setIsNameDialogOpen}
				initialName={userData?.name || ""}
			/>

			<EmailDialog
				isOpen={isEmailDialogOpen}
				onOpenChange={setIsEmailDialogOpen}
				initialEmail={userData?.email || ""}
				onRequestVerification={() => handleRequestVerification("email")}
			/>

			<PhoneDialog
				isOpen={isPhoneDialogOpen}
				onOpenChange={setIsPhoneDialogOpen}
				initialPhone={userData?.phone || ""}
				onRequestVerification={() => handleRequestVerification("phone")}
			/>

			{verifyingField && (
				<OtpDialog
					isOpen={isOtpDialogOpen}
					onOpenChange={setIsOtpDialogOpen}
					verifyingField={verifyingField}
					contactValue={
						verifyingField === "email"
							? userData?.email || ""
							: userData?.phone || ""
					}
					onVerificationComplete={handleVerificationComplete}
					onSwitchMethod={handleSwitchVerificationMethod}
				/>
			)}
		</Card>
	);
};
