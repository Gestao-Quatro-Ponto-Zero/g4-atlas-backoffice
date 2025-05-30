import { useAuth } from '@/contexts/AuthContext'
import { mockCards } from '@/data/mockData'
import { use } from 'react'
import { AddNewPaymentMethodDialog } from './components/AddNewPaymentMethod'
import { PaymentMethodCard } from './components/PaymentMethodCard'

export const Carteira = () => {
	const { promise } = useAuth()
	const user = use(promise)

	if (!user) {
		return (
			<div className='flex flex-col items-center justify-center px-4 py-8'>
				<div className='mb-6 text-center'>
					<h1 className='font-bold text-2xl'>Entre para acessar sua carteira</h1>
					<p className='mx-auto mt-2 max-w-md text-gray-600'>Faça login para visualizar seus métodos de pagamento</p>
				</div>
			</div>
		)
	}

	return (
		<div className='mx-auto w-full px-2 md:px-0' style={{ maxWidth: '900px' }}>
			<div className='mb-5 text-center md:text-left'>
				<h1 className='font-bold text-2xl md:text-3xl'>Minha Carteira</h1>
				<p className='text-gray-600 text-sm md:text-base'>Gerencie seus métodos de pagamento</p>
			</div>

			<div className='rounded-lg bg-white p-4 shadow-xs md:p-6'>
				<div className='mb-6'>
					<h2 className='mb-4 font-medium text-lg'>Métodos de pagamento</h2>

					<div className='grid grid-cols-1 gap-4'>
						{mockCards.map((card) => (
							<PaymentMethodCard
								key={card.id}
								brand={card.brand}
								lastFourDigits={card.lastFourDigits}
								holderName={card.holderName}
								type={card.type}
								isDefault={card.lastFourDigits === '5367'}
								addressId={card.addressId}
								nickname={card.nickname}
							/>
						))}
					</div>

					<div className='mt-6'>
						<AddNewPaymentMethodDialog />
					</div>
				</div>

				<div className='border-gray-100 border-t pt-4'>
					<h3 className='mb-2 font-medium text-gray-700 text-sm'>Informações adicionais</h3>
					<p className='text-gray-500 text-sm'>
						Os cartões adicionados aqui estarão disponíveis para uso em suas próximas compras. Suas informações de
						pagamento são armazenadas com segurança e criptografadas. Boletos e PIX são gerados no momento do pagamento.
					</p>
				</div>
			</div>
		</div>
	)
}
