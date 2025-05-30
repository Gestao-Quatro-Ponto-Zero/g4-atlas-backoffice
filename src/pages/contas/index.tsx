import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import type { Charge } from '@/data/mockData'
import { use, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChargesList } from './components/ChargesList'
import { ModalContent } from './components/ModalContent'
import { getFilteredCharges } from './utils'

export const Contas = () => {
	const { promise } = useAuth()
	const user = use(promise)
	const [selectedCharge, setSelectedCharge] = useState<Charge | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [activeTab, setActiveTab] = useState('all')
	const [searchParams] = useSearchParams()
	const orderFilter = searchParams.get('order')

	// Set the activeTab to 'all' when orderFilter changes
	useEffect(() => {
		if (orderFilter) {
			setActiveTab('all')
		}
	}, [orderFilter])

	// Count payments by status for badges
	const pendingPaymentsCount = getFilteredCharges('pendente', orderFilter).length
	const overduePaymentsCount = getFilteredCharges('vencido', orderFilter).length

	const handleOpenModal = (charge: Charge) => {
		setSelectedCharge(charge)
		setIsModalOpen(true)
	}

	if (!user) return null

	return (
		<>
			<div className='mx-auto w-full max-w-full overflow-hidden px-2 md:px-0' style={{ maxWidth: '900px' }}>
				<div className='mb-5 text-left'>
					<h1 className='font-bold text-2xl md:text-3xl'>Meus Pagamentos</h1>
					<p className='text-gray-600 text-sm md:text-base'>
						Visualize todos os seus pagamentos
						{orderFilter && <span className='font-medium'> - Pedido #{orderFilter}</span>}
					</p>
				</div>

				<Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab} className='mb-6'>
					<TabsList className='grid w-full grid-cols-4'>
						<TabsTrigger value='all'>Todos</TabsTrigger>
						<TabsTrigger value='pago'>Pagos</TabsTrigger>
						<TabsTrigger value='pendente' className='relative'>
							À vencer
							{pendingPaymentsCount > 0 && (
								<Badge variant='secondary' className='ml-1 bg-amber-100 text-amber-800 hover:bg-amber-100'>
									{pendingPaymentsCount}
								</Badge>
							)}
						</TabsTrigger>
						<TabsTrigger
							value='vencido'
							className={`relative ${
								overduePaymentsCount > 0
									? 'border-red-500 border-b-2 bg-red-50 font-semibold text-red-700 hover:bg-red-100 hover:text-red-800'
									: ''
							}`}
						>
							Vencidos
							{overduePaymentsCount > 0 && (
								<Badge variant='destructive' className='ml-1'>
									{overduePaymentsCount}
								</Badge>
							)}
						</TabsTrigger>
					</TabsList>

					<TabsContent value='all' className='mt-4'>
						<ChargesList filteredCharges={getFilteredCharges('all', orderFilter)} handleOpenModal={handleOpenModal} />
					</TabsContent>

					<TabsContent value='pago' className='mt-4'>
						<ChargesList filteredCharges={getFilteredCharges('pago', orderFilter)} handleOpenModal={handleOpenModal} />
					</TabsContent>

					<TabsContent value='pendente' className='mt-4'>
						<ChargesList
							filteredCharges={getFilteredCharges('pendente', orderFilter)}
							handleOpenModal={handleOpenModal}
						/>
					</TabsContent>

					<TabsContent value='vencido' className='mt-4'>
						<ChargesList
							filteredCharges={getFilteredCharges('vencido', orderFilter)}
							handleOpenModal={handleOpenModal}
						/>
					</TabsContent>
				</Tabs>
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className='md:max-w-lg'>
					<DialogHeader>
						<DialogTitle>Detalhes do Pagamento</DialogTitle>
					</DialogHeader>
					<ModalContent selectedCharge={selectedCharge} setIsModalOpen={setIsModalOpen} />
				</DialogContent>
			</Dialog>
		</>
	)
}
