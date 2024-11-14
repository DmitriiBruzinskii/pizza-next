'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../ChooseProductForm";
import { ProductWithRelations } from "../../../../@types/prisma";
import { ChoosePizzaForm } from "../ChoosePizzaForm";

interface Props {
  product: ProductWithRelations;
  className?: string;
};

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()} >
      <DialogContent aria-describedby={undefined} className={cn(className, 'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden')}>
        {
          isPizzaForm ? (
            <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items}/>
          ) : <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        }
      </DialogContent>
    </Dialog>
  )
};