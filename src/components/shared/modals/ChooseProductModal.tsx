'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../ChooseProductForm";
import { ProductWithRelations } from "../../../../@types/prisma";
import { ChoosePizzaForm } from "../ChoosePizzaForm";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useCartStore } from "../../../../store/cart";

interface Props {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);
  const addCartItem = useCartStore(state => state.addCartItem);

  const onAddProduct = () => addCartItem({ productItemId: firstItem.id });
  const onAddPizza = (productItemId: number, ingredients: number[]) => addCartItem({ productItemId, ingredients });

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()} >
      <DialogContent aria-describedby='dialog-description' className={cn(className, 'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden')}>
        <VisuallyHidden>
          <DialogTitle>Product details</DialogTitle>
        </VisuallyHidden>

        {
          isPizzaForm ? (
            <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={onAddPizza} />
          ) : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={onAddProduct} price={firstItem.price}/>
        }
      </DialogContent>
    </Dialog>
  )
};