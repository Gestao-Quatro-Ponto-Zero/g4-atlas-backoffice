import { ProfileSection } from "@/components/ProfileSection";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { HelpCircleIcon, LogOutIcon, MessageCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { FAQ_ITEMS } from "./constants";

export const Route = createFileRoute("/_layout/settings")({
	component: () => {
		const { logout } = useAuth();
		const navigate = useNavigate();

		const handleLogout = () => {
			logout();
			toast.success("Você foi desconectado com sucesso");
			navigate({ to: "/" });
		};

		const handleWhatsAppSupport = () => {
			// Usually this would link to a real support number with a pre-defined message
			window.open(
				"https://wa.me/5511999999999?text=Olá,%20preciso%20de%20ajuda%20com%20a%20plataforma%20G4%20Educação.",
				"_blank",
			);
		};

		return (
			<div className="mx-auto max-w-4xl space-y-6 pb-6">
				{/* User Profile Section */}
				<ProfileSection />

				{/* Support Section */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-xl">Suporte</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex flex-col space-y-4">
							<Card className="border border-gray-200">
								<CardContent className="p-4">
									<div className="flex flex-col items-center text-center">
										<HelpCircleIcon className="mb-2 h-8 w-8 text-blue-600" />
										<h3 className="mb-2 font-medium">Perguntas Frequentes</h3>
										<p className="mb-4 text-gray-500 text-sm">
											Encontre respostas para dúvidas comuns
										</p>

										<Accordion
											type="single"
											collapsible
											className="w-full"
										>
											{FAQ_ITEMS.map((item, index) => (
												<AccordionItem
													key={item.question}
													value={`item-${index}`}
												>
													<AccordionTrigger className="text-left">
														{item.question}
													</AccordionTrigger>
													<AccordionContent>{item.answer}</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</div>
								</CardContent>
							</Card>

							<Card className="border border-gray-200">
								<CardContent className="p-4">
									<div className="flex flex-col items-center text-center">
										<MessageCircleIcon className="mb-2 h-8 w-8 text-green-600" />
										<h3 className="mb-2 font-medium">Contato via WhatsApp</h3>
										<p className="mb-4 text-gray-500 text-sm">
											Fale diretamente com nossa equipe de suporte
										</p>
										<Button
											onClick={handleWhatsAppSupport}
											variant="ghost"
											className="w-full"
										>
											<MessageCircleIcon className="mr-2 h-4 w-4" />
											Contatar Suporte
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>

				{/* Logout Section */}
				<Card>
					<CardContent className="p-6">
						<div className="flex flex-col items-center">
							<h3 className="mb-4 font-medium">Deseja sair da sua conta?</h3>
							<Button
								variant="destructive"
								onClick={handleLogout}
								className="w-full max-w-xs"
							>
								<LogOutIcon className="mr-2 h-4 w-4" />
								Sair
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	},
});
