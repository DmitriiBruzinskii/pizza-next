'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './CartDrawer';

interface Props {
  className?: string;
  loading?: boolean;
}

export const CartButton: React.FC<Props> = ({ className, loading }) => {

  return (
    <CartDrawer>
      <Button
        // loading={loading}
        className={cn('group relative', className)}>
        {/* <b>{totalAmount} ₽</b> */}
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          {/* <b>{items.length}</b> */}
        </div>
        <ArrowRight size={20} className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
      </Button>
    </CartDrawer>
  );
};