'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../ChooseProductForm";
import { ProductWithRelations } from "../../../@types/prisma";
import { ChoosePizzaForm } from "../ChoosePizzaForm";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useCartStore } from "@/store/cart";
import toast from "react-hot-toast";

interface Props {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  const onAddProduct = () => addCartItem({ productItemId: firstItem.id });
  const onAddPizza = async (productItemId: number, ingredients: number[]) => {
    try {
      await addCartItem({ productItemId, ingredients });
      toast.success('Пицца добавлена в корзину');
      router.back();
    } catch (error) {
      toast.error('Не удалось добавить пиццу в корзину');
      console.error(error);
    }
  }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()} >
      <DialogContent aria-describedby='dialog-description' className={cn(className, 'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden')}>
        <VisuallyHidden>
          <DialogTitle>Product details</DialogTitle>
        </VisuallyHidden>

        {
          isPizzaForm ? (
            <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={onAddPizza} loading={loading} />
          ) : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={onAddProduct} price={firstItem.price} loading={loading} />
        }
      </DialogContent>
    </Dialog>
  )
};