import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApiKey } from "@/contexts/ApiKeyContext";
import { createFileRoute } from "@tanstack/react-router";
import { EyeIcon, EyeOffIcon, KeyIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_layout/configuracoes")({
	component: () => {
		const { apiKey, setApiKey, clearApiKey } = useApiKey();
		const [newApiKey, setNewApiKey] = useState("");
		const [showApiKey, setShowApiKey] = useState(false);

		const handleSaveApiKey = () => {
			if (!newApiKey.trim()) {
				toast.error("Por favor, insira uma API key válida");
				return;
			}

			setApiKey(newApiKey.trim());
			setNewApiKey("");
			toast.success("API key salva com sucesso!");
		};

		const handleClearApiKey = () => {
			clearApiKey();
			setNewApiKey("");
			toast.success("API key removida com sucesso!");
		};

		return (
			<div className="mx-auto max-w-4xl space-y-6">
				<div className="mb-6">
					<h1 className="font-bold text-2xl md:text-3xl">Configurações</h1>
					<p className="text-gray-600 text-sm md:text-base">
						Gerencie as configurações da aplicação
					</p>
				</div>

				{/* API Key Configuration */}
				<Card>
					<CardHeader className="flex flex-row items-center space-y-0 pb-4">
						<div className="flex items-center space-x-2">
							<KeyIcon className="h-5 w-5" />
							<CardTitle className="text-xl">Configuração da API</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="api-key">API Key (ACCOUNTS-API-KEY)</Label>
							<p className="text-gray-500 text-sm">
								Esta chave será usada no header de todas as requisições para a
								API de contas.
							</p>
						</div>

						{apiKey && (
							<div className="space-y-2">
								<Label>API Key Atual</Label>
								<div className="flex items-center space-x-2">
									<Input
										type={showApiKey ? "text" : "password"}
										value={apiKey}
										readOnly
										className="font-mono"
									/>
									<Button
										type="button"
										variant="outline"
										size="icon"
										onClick={() => setShowApiKey(!showApiKey)}
									>
										{showApiKey ? (
											<EyeOffIcon className="h-4 w-4" />
										) : (
											<EyeIcon className="h-4 w-4" />
										)}
									</Button>
									<Button
										type="button"
										variant="destructive"
										size="icon"
										onClick={handleClearApiKey}
									>
										<TrashIcon className="h-4 w-4" />
									</Button>
								</div>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="new-api-key">
								{apiKey ? "Nova API Key" : "API Key"}
							</Label>
							<div className="flex items-center space-x-2">
								<Input
									id="new-api-key"
									type="password"
									placeholder="Digite sua API key"
									value={newApiKey}
									onChange={e => setNewApiKey(e.target.value)}
									className="font-mono"
								/>
								<Button
									onClick={handleSaveApiKey}
									disabled={!newApiKey.trim()}
								>
									{apiKey ? "Atualizar" : "Salvar"}
								</Button>
							</div>
						</div>

						<div className="rounded-lg bg-blue-50 p-4">
							<h4 className="font-medium text-blue-900 text-sm">
								Informações de Segurança
							</h4>
							<p className="mt-1 text-blue-700 text-sm">
								A API key é armazenada localmente no seu navegador e será
								incluída automaticamente no header "ACCOUNTS-API-KEY" de todas
								as requisições.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	},
});
