import { Card, CardContent } from '@/components/ui/card'
import type { Order } from '@/data/mockData'
import { useEffect, useState } from 'react'
import { OrderDialog } from './OrderDialog'
import { OrderHeader } from './OrderHeader'
import { OrderProducts } from './OrderProducts'
import { OrderSummary } from './OrderSummary'

export const OrderCard = ({
	order,
	isDialogOpen,
	onDialogClose,
}: {
	order: Order
	isDialogOpen: boolean
	onDialogClose: () => void
}) => {
	const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)

	// Use controlled state from props if provided
	useEffect(() => {
		if (isDialogOpen !== undefined) {
			setIsOrderDialogOpen(isDialogOpen)
		}
	}, [isDialogOpen])

	// Handle order click
	const handleOrderClick = () => {
		setIsOrderDialogOpen(true)
		// Update URL without page navigation
		window.history.pushState({}, '', `/orders/${order.id}`)
	}

	// Handle dialog close
	const handleDialogClose = () => {
		setIsOrderDialogOpen(false)

		// Use the prop callback if provided, otherwise reset URL
		if (onDialogClose) {
			onDialogClose()
		} else {
			// Reset URL without page navigation
			window.history.pushState({}, '', '/')
		}
	}

	// Calculate order total from products
	const calculateOrderTotal = () => {
		return products.reduce((total, product) => total + product.price * product.quantity, 0)
	}

	// Handle retry payment
	const handleRetryPayment = () => {
		console.log('Tentando pagamento novamente para o pedido:', order.id)
		// Em um sistema real, aqui chamaríamos a API do Stripe ou gateway de pagamento
	}

	// Use products array if available, otherwise parse from productName string
	const products =
		order.products ||
		(order.productName.includes(',')
			? order.productName.split(',').map((name) => ({
					name: name.trim(),
					price: order.price / order.productName.split(',').length, // Split price evenly for demo
					quantity: 1,
			  }))
			: [{ name: order.productName, price: order.price, quantity: 1 }])

	return (
		<>
			<Card
				className='cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md'
				onClick={handleOrderClick}
			>
				<CardContent className='p-0'>
					<OrderHeader order={order} />

					<div className='p-4'>
						<OrderProducts products={products} />

						<OrderSummary date={order.date} total={calculateOrderTotal()} />
					</div>
				</CardContent>
			</Card>

			<OrderDialog
				order={order}
				isOpen={isOrderDialogOpen}
				onClose={handleDialogClose}
				products={products}
				calculateOrderTotal={calculateOrderTotal}
				handleRetryPayment={handleRetryPayment}
			/>
		</>
	)
}
