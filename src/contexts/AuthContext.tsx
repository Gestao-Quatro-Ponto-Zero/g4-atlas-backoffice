import { mockUser } from "@/data/mockData";
import { queryOptions, useQuery } from "@tanstack/react-query";
import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

interface AuthContextType {
	userId: number | null;
	login: (email: string, password: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [userId, setUserId] = useState<number | null>(1);

	const login = useCallback((_email: string, _password: string) => {
		setUserId(1);
	}, []);

	const logout = useCallback(() => {
		setUserId(null);
	}, []);

	const contextValue = useMemo(
		() => ({
			userId,
			login,
			logout,
		}),
		[userId, login, logout],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

const authOptions = (userId: number | null) =>
	queryOptions({
		queryKey: ["auth", userId],
		queryFn: () => mockUser,
		enabled: !!userId,
	});

export const useAuth = () => {
	const contextValue = useContext(AuthContext);
	if (!contextValue) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	const query = useQuery(authOptions(contextValue.userId));

	return Object.assign(contextValue, { promise: query.promise });
};
