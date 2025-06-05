
import { layout, rootRoute, route } from "@tanstack/virtual-file-routes";

export const routes = rootRoute("__root.tsx", [
	layout("layout.tsx", [
		route("/", "index.tsx"),
		route("/carteira", "carteira/index.tsx"),
		route("/cobrancas", "cobrancas/index.tsx"),
		route("/configuracoes", "configuracoes/index.tsx"),
		route("/contas", "contas/index.tsx"),
		route("/contratos", "contratos/index.tsx"),
		route("/enderecos", "enderecos/index.tsx"),
		route("/produtos", "produtos/index.tsx"),
		route("/settings", "settings/index.tsx"),
		route("/usuarios", "usuarios/index.tsx"),
	]),
	route("$", "not-found.tsx"),
]);
