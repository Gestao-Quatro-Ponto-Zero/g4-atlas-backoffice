import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/usuarios')({
	component: () => {
		return (
			<div className='grid gap-4'>
				<div className='text-center md:text-left'>
					<h1 className='font-bold text-2xl md:text-3xl'>Usuários</h1>
					<p className='text-gray-600 text-sm md:text-base'>Gerencie os usuários do sistema</p>
				</div>

				<div className='rounded-lg bg-white p-4 shadow-xs md:p-6'>
					<p className='py-8 text-center text-gray-500'>Módulo de usuários em desenvolvimento...</p>
				</div>
			</div>
		)
	},
})
