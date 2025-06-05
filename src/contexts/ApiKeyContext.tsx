
import { createContext, useContext, useState, type ReactNode } from "react";

interface ApiKeyContextType {
	apiKey: string | null;
	setApiKey: (key: string | null) => void;
	clearApiKey: () => void;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
	const [apiKey, setApiKeyState] = useState<string | null>(() => {
		return localStorage.getItem("accounts-api-key");
	});

	const setApiKey = (key: string | null) => {
		setApiKeyState(key);
		if (key) {
			localStorage.setItem("accounts-api-key", key);
		} else {
			localStorage.removeItem("accounts-api-key");
		}
	};

	const clearApiKey = () => {
		setApiKey(null);
	};

	return (
		<ApiKeyContext.Provider value={{ apiKey, setApiKey, clearApiKey }}>
			{children}
		</ApiKeyContext.Provider>
	);
};

export const useApiKey = () => {
	const context = useContext(ApiKeyContext);
	if (!context) {
		throw new Error("useApiKey must be used within an ApiKeyProvider");
	}
	return context;
};
