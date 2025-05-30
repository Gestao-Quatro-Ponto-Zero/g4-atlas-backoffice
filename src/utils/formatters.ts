const currencyFormatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
});

export const formatCurrency = (value: number) => {
	return currencyFormatter.format(value);
};

export const formatDate = (dateInput: string | Date) => {
	const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
	return new Intl.DateTimeFormat("pt-BR").format(date);
};
