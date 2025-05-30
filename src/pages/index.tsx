import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ActivityIcon, BarChart3Icon, ClockIcon, PackageIcon, TrendingUpIcon, UsersIcon } from 'lucide-react'

export const Index = () => {
	return (
		<div className='mx-auto w-full max-w-[900px] px-2 sm:px-0'>
			<div className='mb-5 text-center md:text-left'>
				<h1 className='font-bold text-2xl sm:text-3xl'>Dashboard</h1>
				<p className='text-gray-600 text-sm sm:text-base'>Visão geral do sistema</p>
			</div>

			{/* Cards de estatísticas simplificados */}
			<div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<Card className='relative overflow-hidden'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='font-medium text-gray-400 text-sm'>Total Usuários</CardTitle>
						<UsersIcon className='h-4 w-4 text-gray-300' />
					</CardHeader>
					<CardContent>
						<div className='font-bold text-2xl text-gray-300'>---</div>
						<div className='mt-2 flex items-center'>
							<ClockIcon className='mr-1 h-3 w-3 text-yellow-500' />
							<p className='text-xs text-yellow-600'>Em desenvolvimento</p>
						</div>
					</CardContent>
				</Card>

				<Card className='relative overflow-hidden'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='font-medium text-gray-400 text-sm'>Produtos</CardTitle>
						<PackageIcon className='h-4 w-4 text-gray-300' />
					</CardHeader>
					<CardContent>
						<div className='font-bold text-2xl text-gray-300'>---</div>
						<div className='mt-2 flex items-center'>
							<ClockIcon className='mr-1 h-3 w-3 text-yellow-500' />
							<p className='text-xs text-yellow-600'>Em desenvolvimento</p>
						</div>
					</CardContent>
				</Card>

				<Card className='relative overflow-hidden'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='font-medium text-gray-400 text-sm'>Vendas</CardTitle>
						<TrendingUpIcon className='h-4 w-4 text-gray-300' />
					</CardHeader>
					<CardContent>
						<div className='font-bold text-2xl text-gray-300'>R$ ---</div>
						<div className='mt-2 flex items-center'>
							<ClockIcon className='mr-1 h-3 w-3 text-yellow-500' />
							<p className='text-xs text-yellow-600'>Em desenvolvimento</p>
						</div>
					</CardContent>
				</Card>

				<Card className='relative overflow-hidden'>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='font-medium text-gray-400 text-sm'>Conversão</CardTitle>
						<BarChart3Icon className='h-4 w-4 text-gray-300' />
					</CardHeader>
					<CardContent>
						<div className='font-bold text-2xl text-gray-300'>---%</div>
						<div className='mt-2 flex items-center'>
							<ClockIcon className='mr-1 h-3 w-3 text-yellow-500' />
							<p className='text-xs text-yellow-600'>Em desenvolvimento</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Seções de gráficos em placeholder */}
			<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle className='text-gray-400'>Vendas por Mês</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex h-64 items-center justify-center rounded-lg border-2 border-gray-200 border-dashed bg-gray-50'>
							<div className='text-center'>
								<BarChart3Icon className='mx-auto mb-2 h-12 w-12 text-gray-300' />
								<p className='text-gray-400 text-sm'>Gráfico será implementado</p>
								<div className='mt-1 flex items-center justify-center'>
									<ClockIcon className='mr-1 h-3 w-3 text-yellow-500' />
									<span className='text-xs text-yellow-600'>Em breve</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className='text-gray-400'>Atividade por Categoria</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex h-64 items-center justify-center rounded-lg border-2 border-gray-200 border-dashed bg-gray-50'>
							<div className='text-center'>
								<ActivityIcon className='mx-auto mb-2 h-12 w-12 text-gray-300' />
								<p className='text-gray-400 text-sm'>Gráfico será implementado</p>
								<div className='mt-1 flex items-center justify-center'>
									<ClockIcon className='mr-1 h-3 w-3 text-yellow-500' />
									<span className='text-xs text-yellow-600'>Em breve</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Seção adicional para futuras features */}
			<div className='mt-6'>
				<Card>
					<CardHeader>
						<CardTitle className='text-gray-400'>Funcionalidades Futuras</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
							<div className='rounded-lg border-2 border-gray-200 border-dashed bg-gray-50 p-4 text-center'>
								<UsersIcon className='mx-auto mb-2 h-8 w-8 text-gray-300' />
								<h3 className='mb-1 font-medium text-gray-400'>Gestão de Usuários</h3>
								<p className='text-gray-400 text-xs'>Cadastro e controle de usuários</p>
							</div>
							<div className='rounded-lg border-2 border-gray-200 border-dashed bg-gray-50 p-4 text-center'>
								<PackageIcon className='mx-auto mb-2 h-8 w-8 text-gray-300' />
								<h3 className='mb-1 font-medium text-gray-400'>Catálogo de Produtos</h3>
								<p className='text-gray-400 text-xs'>Gerenciamento de produtos</p>
							</div>
							<div className='rounded-lg border-2 border-gray-200 border-dashed bg-gray-50 p-4 text-center'>
								<BarChart3Icon className='mx-auto mb-2 h-8 w-8 text-gray-300' />
								<h3 className='mb-1 font-medium text-gray-400'>Relatórios Avançados</h3>
								<p className='text-gray-400 text-xs'>Analytics e insights detalhados</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
