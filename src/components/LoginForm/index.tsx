import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import { LoginButton } from "./LoginButton";

export const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();

	const handleSubmit = async () => {
		try {
			await login(email, password);
			toast.success("Login realizado com sucesso!");
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Falha no login. Verifique suas credenciais.");
		}
	};

	return (
		<div className="w-full max-w-md">
			<div className="rounded-lg bg-white p-8 shadow-md">
				<div className="mb-6 text-center">
					<h2 className="font-bold text-2xl text-gray-900">Acesse sua conta</h2>
					<p className="mt-2 text-gray-600">
						Entre com suas credenciais para acessar seus pedidos e informações
					</p>
				</div>

				<form
					action={handleSubmit}
					className="space-y-4"
				>
					<div>
						<label
							htmlFor="email"
							className="mb-1 block font-medium text-gray-700 text-sm"
						>
							E-mail
						</label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="seu@email.com"
							required
							className="w-full"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="mb-1 block font-medium text-gray-700 text-sm"
						>
							Senha
						</label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							placeholder="••••••••"
							required
							className="w-full"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-gray-700 text-sm"
							>
								Lembrar de mim
							</label>
						</div>

						<a
							href="#"
							className="font-medium text-blue-600 text-sm hover:text-blue-500"
						>
							Esqueceu a senha?
						</a>
					</div>

					<LoginButton />

					<div className="mt-4 text-center">
						<p className="text-gray-600 text-sm">
							Não tem uma conta?
							<a
								href="#register"
								className="font-medium text-blue-600 hover:text-blue-500"
							>
								Cadastre-se
							</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};
