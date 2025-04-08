
import React from 'react';
import { cn } from '@/lib/utils';
import { Order } from '@/data/mockData';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface OrderCardProps {
  order: Order;
}

// We need to create this utility
<lov-write file_path="src/utils/formatters.ts">
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
}
