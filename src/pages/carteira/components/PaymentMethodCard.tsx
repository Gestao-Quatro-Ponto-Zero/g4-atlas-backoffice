import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { mockAddresses } from '@/data/mockData'
import { CheckIcon, EditIcon, MapPinIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

type EditCardFormData = {
	nickname?: string
	addressId: string
}

export const PaymentMethodCard = ({
	brand,
	lastFourDigits,
	holderName,
	type = 'credit',
	isDefault = false,
	addressId,
	nickname,
}: {
	brand: string
	lastFourDigits: string
	holderName: string
	type?: string
	isDefault?: boolean
	addressId: string
	nickname?: string
}) => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [showEditDialog, setShowEditDialog] = useState(false)
	const [associatedAddress, setAssociatedAddress] = useState(null)
	const [_selectedAddress, _setSelectedAddress] = useState(addressId || '')
	const [useNewAddress, setUseNewAddress] = useState(false)
	const [newAddressForm, setNewAddressForm] = useState({
		street: '',
		neighborhood: '',
		city: '',
		state: '',
		zipCode: '',
	})

	const form = useForm<EditCardFormData>({
		defaultValues: {
			nickname: nickname || '',
			addressId: addressId || '',
		},
	})

	// Find associated address
	useEffect(() => {
		if (addressId) {
			const address = mockAddresses.find((addr) => addr.id === addressId)
			setAssociatedAddress(address)
		}
	}, [addressId])

	const handleSubmitEditCard = (data: EditCardFormData) => {
		// Here would be the API call to update the card
		console.log('Updated card data:', data)
		toast('Cartão atualizado', {
			description: 'As informações do cartão foram atualizadas com sucesso.',
		})
		setShowEditDialog(false)
	}

	const handleSubmitNewAddress = () => {
		// Here would be the API call to create a new address
		console.log('New address data:', newAddressForm)
		toast('Endereço adicionado', {
			description: 'Um novo endereço foi adicionado com sucesso.',
		})
		setUseNewAddress(false)
	}

	return (
		<Card className='relative overflow-hidden'>
			<CardContent className='p-5'>
				<div className='flex items-start justify-between'>
					<div className='space-y-3'>
						{/* Card brand and basic details */}
						<div className='flex items-center space-x-2'>
							{/* Card brand and basic details */}
							{brand === 'mastercard' && (
								<div className='flex h-8 w-10 items-center justify-center rounded bg-[#FF5F00]'>
									<div className='-mr-1 h-4 w-4 rounded-full bg-[#EB001B] opacity-85' />
									<div className='h-4 w-4 rounded-full bg-[#F79E1B] opacity-85' />
								</div>
							)}
							{brand === 'visa' && (
								<div className='flex h-8 w-10 items-center justify-center rounded border border-blue-200 bg-blue-100 text-blue-700'>
									<span className='font-bold text-sm'>VISA</span>
								</div>
							)}
							<div>
								<p className='font-medium'>
									•••• {lastFourDigits}
									{nickname && <span className='ml-2 text-gray-500 text-sm'>({nickname})</span>}
								</p>
								<p className='text-gray-500 text-sm'>{holderName}</p>
							</div>
						</div>

						{/* Card type and default status */}
						<div className='flex items-center space-x-2'>
							<span className='rounded bg-gray-100 px-2 py-0.5 text-gray-700 text-xs'>
								{type === 'credit' ? 'Crédito' : 'Débito'}
							</span>
							{isDefault && (
								<span className='flex items-center rounded bg-blue-50 px-2 py-0.5 text-blue-700 text-xs'>
									<CheckIcon className='mr-1 h-3 w-3' />
									Padrão
								</span>
							)}
						</div>

						{/* Address information */}
						{associatedAddress && (
							<div className='border-gray-100 border-t pt-2'>
								<div className='flex items-start'>
									<MapPinIcon className='mt-0.5 mr-1.5 h-4 w-4 text-gray-500' />
									<div className='text-sm'>
										<p className='text-gray-600'>{associatedAddress.street}</p>
										<p className='text-gray-500'>
											{associatedAddress.city}, {associatedAddress.state}
										</p>
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Card actions */}
					<div className='flex space-x-1'>
						<Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
							<DialogTrigger asChild>
								<Button variant='ghost' size='icon' className='h-8 w-8'>
									<EditIcon className='h-4 w-4' />
								</Button>
							</DialogTrigger>
							<DialogContent className='md:max-w-md'>
								<DialogHeader>
									<DialogTitle>Editar cartão</DialogTitle>
									<DialogDescription>Atualize as informações do seu cartão</DialogDescription>
								</DialogHeader>

								<Form {...form}>
									<form onSubmit={form.handleSubmit(handleSubmitEditCard)} className='space-y-4'>
										{/* Non-editable card details */}
										<div className='mb-4 rounded bg-gray-50 p-3'>
											<div className='mb-2 flex items-center space-x-3'>
												{brand === 'mastercard' && (
													<div className='flex h-6 w-8 items-center justify-center rounded bg-[#FF5F00]'>
														<div className='-mr-1 h-3 w-3 rounded-full bg-[#EB001B] opacity-85' />
														<div className='h-3 w-3 rounded-full bg-[#F79E1B] opacity-85' />
													</div>
												)}
												{brand === 'visa' && (
													<div className='flex h-6 w-8 items-center justify-center rounded border border-blue-200 bg-blue-100 text-blue-700'>
														<span className='font-bold text-xs'>VISA</span>
													</div>
												)}
												<div>
													<p className='font-medium text-sm'>•••• {lastFourDigits}</p>
												</div>
											</div>
											<div className='grid grid-cols-2 gap-2 text-sm'>
												<div>
													<p className='text-gray-500'>Titular</p>
													<p>{holderName}</p>
												</div>
												<div>
													<p className='text-gray-500'>Tipo</p>
													<p>{type === 'credit' ? 'Crédito' : 'Débito'}</p>
												</div>
											</div>
										</div>

										{/* Editable fields */}
										<FormField
											control={form.control}
											name='nickname'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Nome do cartão (opcional)</FormLabel>
													<FormDescription className='mt-0 text-gray-500 text-xs'>
														Ex: Cartão Pessoal, Cartão da Empresa
													</FormDescription>
													<FormControl>
														<Input placeholder='Dê um nome para identificar este cartão' {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<Separator className='my-4' />

										<h4 className='font-medium text-sm'>Endereço de cobrança</h4>

										<RadioGroup
											value={useNewAddress ? 'new' : 'existing'}
											onValueChange={(value) => setUseNewAddress(value === 'new')}
										>
											<div className='mb-3 flex items-start space-x-2'>
												<RadioGroupItem value='existing' id='existing' />
												<div className='grid w-full gap-1.5'>
													<label htmlFor='existing' className='font-medium text-sm'>
														Usar um endereço existente
													</label>
													{!useNewAddress && (
														<FormField
															control={form.control}
															name='addressId'
															render={({ field }) => (
																<FormItem>
																	<Select onValueChange={field.onChange} defaultValue={field.value}>
																		<FormControl>
																			<SelectTrigger>
																				<SelectValue placeholder='Selecione um endereço' />
																			</SelectTrigger>
																		</FormControl>
																		<SelectContent>
																			{mockAddresses.map((address) => (
																				<SelectItem key={address.id} value={address.id}>
																					{address.street}, {address.city}/{address.state}
																					{address.isDefault && ' (Padrão)'}
																				</SelectItem>
																			))}
																		</SelectContent>
																	</Select>
																	<FormMessage />
																</FormItem>
															)}
														/>
													)}
													<div className='mt-1 flex justify-between'>
														<Link to='/enderecos' className='text-blue-600 text-xs hover:underline'>
															Gerenciar endereços
														</Link>
													</div>
												</div>
											</div>

											<div className='flex items-start space-x-2'>
												<RadioGroupItem value='new' id='new' />
												<div className='grid w-full gap-1.5'>
													<label htmlFor='new' className='font-medium text-sm'>
														Adicionar novo endereço
													</label>
													{useNewAddress && (
														<div className='mt-2 grid grid-cols-1 gap-4'>
															<div>
																<Label htmlFor='street'>Endereço</Label>
																<Input
																	id='street'
																	placeholder='Rua, número'
																	value={newAddressForm.street}
																	onChange={(e) =>
																		setNewAddressForm({
																			...newAddressForm,
																			street: e.target.value,
																		})
																	}
																/>
															</div>
															<div className='grid grid-cols-2 gap-3'>
																<div>
																	<Label htmlFor='neighborhood'>Bairro</Label>
																	<Input
																		id='neighborhood'
																		placeholder='Bairro'
																		value={newAddressForm.neighborhood}
																		onChange={(e) =>
																			setNewAddressForm({
																				...newAddressForm,
																				neighborhood: e.target.value,
																			})
																		}
																	/>
																</div>
																<div>
																	<Label htmlFor='city'>Cidade</Label>
																	<Input
																		id='city'
																		placeholder='Cidade'
																		value={newAddressForm.city}
																		onChange={(e) =>
																			setNewAddressForm({
																				...newAddressForm,
																				city: e.target.value,
																			})
																		}
																	/>
																</div>
															</div>
															<div className='grid grid-cols-2 gap-3'>
																<div>
																	<Label htmlFor='state'>Estado</Label>
																	<Input
																		id='state'
																		placeholder='Estado'
																		value={newAddressForm.state}
																		onChange={(e) =>
																			setNewAddressForm({
																				...newAddressForm,
																				state: e.target.value,
																			})
																		}
																	/>
																</div>
																<div>
																	<Label htmlFor='zipCode'>CEP</Label>
																	<Input
																		id='zipCode'
																		placeholder='CEP'
																		value={newAddressForm.zipCode}
																		onChange={(e) =>
																			setNewAddressForm({
																				...newAddressForm,
																				zipCode: e.target.value,
																			})
																		}
																	/>
																</div>
															</div>
															<Button type='button' onClick={handleSubmitNewAddress} className='mt-1'>
																Salvar novo endereço
															</Button>
														</div>
													)}
												</div>
											</div>
										</RadioGroup>

										<DialogFooter className='mt-4 flex flex-col gap-2 md:flex-row'>
											<Button variant='outline' type='button' onClick={() => setShowEditDialog(false)}>
												Cancelar
											</Button>
											<Button type='submit'>Salvar alterações</Button>
										</DialogFooter>
									</form>
								</Form>
							</DialogContent>
						</Dialog>

						<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
							<AlertDialogTrigger asChild>
								<Button variant='ghost' size='icon' className='h-8 w-8 text-red-500'>
									<Trash2Icon className='h-4 w-4' />
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Excluir método de pagamento</AlertDialogTitle>
									<AlertDialogDescription>
										Tem certeza que deseja excluir este cartão? Esta ação não pode ser desfeita.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancelar</AlertDialogCancel>
									<AlertDialogAction className='bg-red-600 hover:bg-red-700'>Excluir</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
