import { Order } from '@/data/mockData';

export interface OrderCardProps {
  order: Order;
  isDialogOpen?: boolean;
  onDialogClose?: () => void;
}