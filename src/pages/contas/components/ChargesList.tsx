import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Charge, Product } from '@/data/mockData'
import { useIsMobile } from '@/hooks/use-mobile'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { ArrowLeftIcon } from 'lucide-react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { PaymentMethodDisplay } from './PaymentMethodDisplay'
import { StatusBadge } from './StatusBadge'

// Helper to display products summary
const getProductsDisplay = (products: Product[]) => {
	if (!products || products.length === 0) {
		return <span className='text-gray-500 italic'>Sem produtos</span>
	}

	return (
		<div>
			<span className='font-medium'>{products[0].name}</span>
			{products.length > 1 && (
				<div className='mt-1 text-gray-500 text-xs'>
					+ {products.length - 1}
					{products.length - 1 === 1 ? ' produto' : ' produtos'}
				</div>
			)}
		</div>
	)
}

export const ChargesList = ({
	filteredCharges,
	handleOpenModal,
}: {
	filteredCharges: Charge[]
	handleOpenModal: (charge: Charge) => void
}) => {
	const isMobile = useIsMobile()
	const [searchParams] = useSearchParams()
	const orderFilter = searchParams.get('order')
	const navigate = useNavigate()
	const location = useLocation()

	return (
		<Card className='max-w-full overflow-hidden'>
			<CardContent className='p-0'>
				{orderFilter && (
					<div className='flex items-center justify-between border-blue-100 border-b bg-blue-50 p-4'>
						<div>
							<h3 className='font-medium text-blue-800'>Filtrando pelo pedido: #{orderFilter}</h3>
							<p className='text-blue-600 text-sm'>{filteredCharges.length} pagamento(s) encontrado(s)</p>
						</div>
						<Button
							variant='outline'
							size='sm'
							onClick={() => {
								// Remove the order filter from the URL without navigating
								const newSearchParams = new URLSearchParams(searchParams)
								newSearchParams.delete('order')
								window.history.pushState(
									{},
									'',
									`${location.pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`
								)
								window.location.reload() // Simple way to refresh with new URL
							}}
						>
							<ArrowLeftIcon className='mr-1 h-4 w-4' />
							Voltar para todos
						</Button>
					</div>
				)}
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='whitespace-nowrap'>Pedido</TableHead>
								<TableHead className='whitespace-nowrap'>Data</TableHead>
								<TableHead className={isMobile ? 'hidden whitespace-nowrap md:table-cell' : 'whitespace-nowrap'}>
									Produtos
								</TableHead>
								<TableHead className='whitespace-nowrap'>Valor</TableHead>
								<TableHead className={isMobile ? 'hidden whitespace-nowrap md:table-cell' : 'whitespace-nowrap'}>
									Forma de Pagamento
								</TableHead>
								<TableHead className='whitespace-nowrap'>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredCharges.map((charge) => (
								<TableRow
									key={charge.id}
									className='cursor-pointer hover:bg-gray-50'
									onClick={() => handleOpenModal(charge)}
								>
									<TableCell className='font-medium text-blue-700'>
										<button
											type='button'
											className='hover:underline focus:outline-hidden'
											onClick={(e) => {
												e.stopPropagation()
												navigate(`/pedidos/${charge.orderId}`)
											}}
										>
											#{charge.orderId}
										</button>
									</TableCell>
									<TableCell className='whitespace-nowrap font-medium'>{formatDate(charge.dueDate)}</TableCell>
									<TableCell className={isMobile ? 'hidden md:table-cell' : ''}>
										{getProductsDisplay(charge.products)}
									</TableCell>
									<TableCell className='whitespace-nowrap'>{formatCurrency(charge.amount)}</TableCell>
									<TableCell className={isMobile ? 'hidden md:table-cell' : ''}>
										<PaymentMethodDisplay method={charge.paymentMethod} />
									</TableCell>
									<TableCell className='whitespace-nowrap'>
										<StatusBadge status={charge.status} />
									</TableCell>
								</TableRow>
							))}
							{filteredCharges.length === 0 && (
								<TableRow>
									<TableCell colSpan={6} className='py-6 text-center text-gray-500'>
										{orderFilter
											? `Nenhuma fatura encontrada para o pedido #${orderFilter}`
											: 'Nenhuma fatura encontrada para este filtro'}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	)
}
