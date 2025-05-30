import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './pages/layout'
import { Spinner } from './components/Spinner'

export const router = createBrowserRouter([
	{
		path: '/',
		Component: Layout,
		hydrateFallbackElement: <Spinner />,
		children: [
			{
				index: true,
				lazy: {
					Component: () => import('./pages/index').then((module) => module.Index),
				},
			},
			{
				path: '/usuarios',
				lazy: {
					Component: () => import('./pages/usuarios').then((module) => module.Usuarios),
				},
			},
			{
				path: '/produtos',
				lazy: {
					Component: () => import('./pages/produtos').then((module) => module.Produtos),
				},
			},
			{
				path: '/settings',
				lazy: {
					Component: () => import('./pages/settings').then((module) => module.Settings),
				},
			},
			{
				path: '/carteira',
				lazy: {
					Component: () => import('./pages/carteira').then((module) => module.Carteira),
				},
			},
			{
				path: '/contas',
				lazy: {
					Component: () => import('./pages/contas').then((module) => module.Contas),
				},
			},
			{
				path: '/cobrancas',
				lazy: {
					Component: () => import('./pages/cobrancas').then((module) => module.Cobrancas),
				},
			},
			{
				path: '/contratos',
				lazy: {
					Component: () => import('./pages/contratos').then((module) => module.Contratos),
				},
			},
			{
				path: '/enderecos',
				lazy: {
					Component: () => import('./pages/enderecos').then((module) => module.Enderecos),
				},
			},
		],
	},
	{
		path: '*',
		lazy: {
			Component: () => import('./pages/not-found').then((module) => module.NotFound),
		},
	},
])
