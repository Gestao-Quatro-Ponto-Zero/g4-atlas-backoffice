import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

export const LoginButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			className="w-full bg-blue-600 hover:bg-blue-700"
			disabled={pending}
		>
			{pending ? (
				<>
					<Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
					Entrando...
				</>
			) : (
				"Entrar"
			)}
		</Button>
	);
};
