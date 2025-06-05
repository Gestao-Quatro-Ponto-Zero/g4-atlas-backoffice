
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { ApiKeyProvider } from "./contexts/ApiKeyContext";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const router = createRouter({
	routeTree: routes,
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ApiKeyProvider>
					<RouterProvider router={router} />
					<Toaster />
				</ApiKeyProvider>
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>,
);
