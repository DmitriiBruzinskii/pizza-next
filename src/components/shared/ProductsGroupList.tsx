import React from "react";
import { ProductCard } from "./ProductCard";
import { Title } from "./Title";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  items: any[];
  categoryId?: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId, className, listClassName }) => {
  return (
    <div className={className}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => <ProductCard key={product.id} id={product.id} name={product.name} imageUrl={product.imageUrl} price={product.items[0].price} />)}
      </div>
    </div>
  )
}