import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Contract, Order } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { AlertCircleIcon, FileTextIcon } from 'lucide-react'
import { StatusBadge } from './StatusBadge'

export const ModalContent = ({
	selectedContract,
	getAssociatedOrder,
	getContractTypeDisplay,
}: {
	selectedContract: Contract
	getAssociatedOrder: (orderId: string) => Order | undefined
	getContractTypeDisplay: (type: string) => string
}) => {
	if (!selectedContract) return null

	const associatedOrder = getAssociatedOrder(selectedContract.orderId)

	return (
		<>
			<div className='sr-only'>Detalhes do contrato selecionado</div>

			<div className='mb-6 overflow-hidden rounded-lg border'>
				<div className='bg-gray-50 p-4'>
					<h3 className='mb-2 font-medium text-lg'>Detalhes do Contrato</h3>

					<div className='mb-3 grid grid-cols-2 gap-4'>
						<div>
							<p className='text-gray-500 text-sm'>ID do Contrato</p>
							<p className='font-medium'>{selectedContract.id}</p>
						</div>
						<div>
							<p className='text-gray-500 text-sm'>Tipo de Contrato</p>
							<p className='font-medium'>{getContractTypeDisplay(selectedContract.type)}</p>
						</div>
					</div>

					<div className='mb-3 grid grid-cols-2 gap-4'>
						<div>
							<p className='text-gray-500 text-sm'>Status do Contrato</p>
							<div className='mt-1'>
								<StatusBadge status={selectedContract.status} />
							</div>
						</div>
						<div>
							<p className='text-gray-500 text-sm'>Renovação Automática</p>
							<p className='font-medium'>{selectedContract.automaticRenewal ? 'Sim' : 'Não'}</p>
						</div>
					</div>

					<div className='mb-3 grid grid-cols-2 gap-4'>
						<div>
							<p className='text-gray-500 text-sm'>Data de Início</p>
							<p className='font-medium'>{formatDate(selectedContract.startDate)}</p>
						</div>
						<div>
							<p className='text-gray-500 text-sm'>Data de Término</p>
							<p className='font-medium'>{selectedContract.endDate ? formatDate(selectedContract.endDate) : 'N/A'}</p>
						</div>
					</div>

					{selectedContract.description && (
						<div className='mt-3'>
							<p className='text-gray-500 text-sm'>Descrição</p>
							<p className='mt-1 text-sm'>{selectedContract.description}</p>
						</div>
					)}

					{selectedContract.status === 'pending' && (
						<div className='mt-4 rounded-md border border-amber-200 bg-amber-50 p-3'>
							<div className='flex items-start'>
								<AlertCircleIcon className='mt-0.5 mr-2 h-5 w-5 text-amber-500' />
								<div>
									<p className='font-medium text-amber-800'>Contrato pendente de assinatura</p>
									<p className='mt-1 text-amber-700 text-sm'>
										Este contrato precisa ser assinado para ativar os serviços contratados.
									</p>
								</div>
							</div>
							<Button className='mt-3 bg-amber-600 hover:bg-amber-700' size='sm'>
								Assinar Contrato
							</Button>
						</div>
					)}
				</div>

				<div className='border-t p-4'>
					<h4 className='mb-2 font-medium'>Documentos</h4>

					<div className='mt-3 flex flex-wrap gap-2'>
						{selectedContract.documentUrl && (
							<Button size='sm' variant='outline' asChild>
								<a href={selectedContract.documentUrl} target='_blank' rel='noopener noreferrer'>
									<FileTextIcon className='mr-1 h-4 w-4' /> Ver documento
								</a>
							</Button>
						)}

						{!selectedContract.documentUrl && <p className='text-gray-500 text-sm'>Nenhum documento disponível</p>}
					</div>
				</div>
			</div>

			<div className='overflow-hidden rounded-lg border'>
				<div className='bg-gray-50 p-4'>
					<h3 className='mb-2 font-medium text-lg'>Informações do Pedido</h3>

					<div className='mb-3 grid grid-cols-2 gap-4'>
						<div>
							<p className='text-gray-500 text-sm'>Número do pedido</p>
							<p className='font-medium'>#{selectedContract.orderId}</p>
						</div>
						<div>
							<p className='text-gray-500 text-sm'>Valor do Pedido</p>
							<p className='font-medium'>{associatedOrder ? formatCurrency(associatedOrder.price) : 'N/A'}</p>
						</div>
					</div>

					<div className='mt-3'>
						<Button size='sm' variant='outline' asChild>
							<a href={`/contas?order=${selectedContract.orderId}`}>Ver Pagamentos Relacionados</a>
						</Button>
					</div>
				</div>

				{associatedOrder?.products && (
					<div className='border-t'>
						<h4 className='border-b bg-gray-50 p-3 font-medium'>Itens do Pedido</h4>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Item</TableHead>
									<TableHead className='text-right'>Valor</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{associatedOrder.products.map((product) => (
									<TableRow key={product.name}>
										<TableCell>{product.name}</TableCell>
										<TableCell className='text-right'>{formatCurrency(product.price)}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}
			</div>
		</>
	)
}
