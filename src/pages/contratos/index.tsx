import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/contexts/AuthContext'
import { type Contract, mockOrders } from '@/data/mockData'
import { use, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ContractsList } from './components/ContractsList'
import { ModalContent } from './components/ModalContent'

export const Contratos = () => {
	const { promise } = useAuth()
	use(promise)
	const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [activeTab, setActiveTab] = useState('all')
	const [searchParams] = useSearchParams()
	const orderFilter = searchParams.get('order')

	// Extract contracts from orders
	const extractContracts = () => {
		const contracts: Contract[] = []

		mockOrders.forEach((order) => {
			if (order.contract) {
				contracts.push({
					...order.contract,
					orderId: order.id,
				})
			}
		})

		return contracts
	}

	const allContracts = extractContracts()

	// Set the activeTab to 'all' when orderFilter changes
	useEffect(() => {
		if (orderFilter) {
			setActiveTab('all')
		}
	}, [orderFilter])

	const getFilteredContracts = (statusFilter: string) => {
		// First apply the order filter, if present
		let contracts = [...allContracts]

		if (orderFilter) {
			contracts = contracts.filter((contract) => contract.orderId === orderFilter)
		}

		// Then apply status filter
		if (statusFilter === 'all') {
			return contracts.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
		}
		if (statusFilter === 'active') return contracts.filter((contract) => contract.status === 'active')
		if (statusFilter === 'pending') return contracts.filter((contract) => contract.status === 'pending')
		if (statusFilter === 'expired') return contracts.filter((contract) => contract.status === 'expired')
		if (statusFilter === 'canceled') return contracts.filter((contract) => contract.status === 'canceled')

		return contracts
	}

	const getContractTypeDisplay = (type: string) => {
		switch (type) {
			case 'assinatura':
				return 'Assinatura'
			case 'educacional':
				return 'Educacional'
			default:
				return type.charAt(0).toUpperCase() + type.slice(1)
		}
	}

	const handleOpenModal = (contract: Contract) => {
		setSelectedContract(contract)
		setIsModalOpen(true)
	}

	const getAssociatedOrder = (orderId: string) => {
		return mockOrders.find((order) => order.id === orderId)
	}

	return (
		<>
			<div className='mx-auto w-full max-w-full overflow-hidden px-2 md:px-0' style={{ maxWidth: '900px' }}>
				<div className='mb-5 text-left'>
					<h1 className='font-bold text-2xl md:text-3xl'>Meus Contratos</h1>
					<p className='text-gray-600 text-sm md:text-base'>
						Visualize todos os seus contratos
						{orderFilter && <span className='font-medium'> - Pedido #{orderFilter}</span>}
					</p>
				</div>

				<Tabs defaultValue='all' value={activeTab} onValueChange={setActiveTab} className='mb-6'>
					<TabsList className='grid w-full grid-cols-5'>
						<TabsTrigger value='all'>Todos</TabsTrigger>
						<TabsTrigger value='active'>Ativos</TabsTrigger>
						<TabsTrigger value='pending'>Pendentes</TabsTrigger>
						<TabsTrigger value='expired'>Expirados</TabsTrigger>
						<TabsTrigger value='canceled'>Cancelados</TabsTrigger>
					</TabsList>

					<TabsContent value='all' className='mt-4'>
						<ContractsList
							filteredContracts={getFilteredContracts('all')}
							getAssociatedOrder={getAssociatedOrder}
							handleOpenModal={handleOpenModal}
							getContractTypeDisplay={getContractTypeDisplay}
						/>
					</TabsContent>

					<TabsContent value='active' className='mt-4'>
						<ContractsList
							filteredContracts={getFilteredContracts('active')}
							getAssociatedOrder={getAssociatedOrder}
							handleOpenModal={handleOpenModal}
							getContractTypeDisplay={getContractTypeDisplay}
						/>
					</TabsContent>

					<TabsContent value='pending' className='mt-4'>
						<ContractsList
							filteredContracts={getFilteredContracts('pending')}
							getAssociatedOrder={getAssociatedOrder}
							handleOpenModal={handleOpenModal}
							getContractTypeDisplay={getContractTypeDisplay}
						/>
					</TabsContent>

					<TabsContent value='expired' className='mt-4'>
						<ContractsList
							filteredContracts={getFilteredContracts('expired')}
							getAssociatedOrder={getAssociatedOrder}
							handleOpenModal={handleOpenModal}
							getContractTypeDisplay={getContractTypeDisplay}
						/>
					</TabsContent>

					<TabsContent value='canceled' className='mt-4'>
						<ContractsList
							filteredContracts={getFilteredContracts('canceled')}
							getAssociatedOrder={getAssociatedOrder}
							handleOpenModal={handleOpenModal}
							getContractTypeDisplay={getContractTypeDisplay}
						/>
					</TabsContent>
				</Tabs>
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className='md:max-w-lg'>
					<DialogHeader>
						<DialogTitle>Detalhes do Contrato</DialogTitle>
					</DialogHeader>
					{selectedContract && (
						<ModalContent
							selectedContract={selectedContract}
							getAssociatedOrder={getAssociatedOrder}
							getContractTypeDisplay={getContractTypeDisplay}
						/>
					)}
				</DialogContent>
			</Dialog>
		</>
	)
}
