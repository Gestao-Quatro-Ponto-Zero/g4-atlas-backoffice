import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import reactESBuild from "@vitejs/plugin-react";
import reactSWC from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [
		tailwindcss(),
		TanStackRouterVite({
			target: "react",
			autoCodeSplitting: true,
			virtualRouteConfig: "src/routes.ts",
		}),
		mode === "development"
			? reactSWC({
					devTarget: "esnext",
				})
			: reactESBuild({
					babel: {
						plugins: [["babel-plugin-react-compiler", {}]],
					},
				}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	target: "esnext",
	build: {
		modulePreload: {
			polyfill: false,
		},
		rollupOptions: {
			treeshake: "smallest",
			output: {
				compact: true,
				generatedCode: "es2015",
			},
		},
	},
}));
