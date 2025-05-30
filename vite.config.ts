import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import reactESBuild from "@vitejs/plugin-react";
import reactSWC from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	server: {
		host: "::",
		port: 8080,
	},
	plugins: [
		tailwindcss(),
		mode === "development"
			? reactSWC({
					devTarget: "esnext",
				})
			: reactESBuild({
					babel: {
						plugins: [["babel-plugin-react-compiler", {}]],
					},
				}),
		mode === "development" && componentTagger(),
	].filter(Boolean),
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	target: "esnext",
	css: {
		transformer: "lightningcss",
	},
	build: {
		modulePreload: {
			polyfill: false,
		},
		cssMinify: "lightningcss",
		rollupOptions: {
			treeshake: "smallest",
			output: {
				compact: true,
				generatedCode: {
					arrowFunctions: true,
					constBindings: true,
					objectShorthand: true,
					preset: "es2015",
					reservedNamesAsProps: false,
					symbols: true,
				},
			},
		},
	},
}));
