const currencyFormatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
});

export function formatCurrency(value: number): string {
	return currencyFormatter.format(value);
}

export function formatDate(dateInput: string | Date): string {
	const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
	return new Intl.DateTimeFormat("pt-BR").format(date);
}
