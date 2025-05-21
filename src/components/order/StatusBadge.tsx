
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type OrderStatus = 'approved' | 'pending' | 'denied';

interface StatusBadgeProps {
  status: OrderStatus;
  variant?: 'default' | 'small';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'default', className }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle className={variant === 'small' ? "h-3 w-3 mr-1" : "h-4 w-4"} />;
      case 'pending':
        return <Clock className={variant === 'small' ? "h-3 w-3 mr-1" : "h-4 w-4"} />;
      case 'denied':
        return <XCircle className={variant === 'small' ? "h-3 w-3 mr-1" : "h-4 w-4"} />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'approved':
        return 'Aprovado';
      case 'pending':
        return 'Pendente';
      case 'denied':
        return 'Recusado';
      default:
        return 'Desconhecido';
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'denied':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  if (variant === 'small') {
    return (
      <Badge variant="outline" className={cn(getStatusStyles(), className)}>
        {getStatusIcon()}
        {getStatusText()}
      </Badge>
    );
  }

  return (
    <div className={cn(
      "px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
      getStatusStyles(),
      className
    )}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
    </div>
  );
};

export default StatusBadge;
