'use client';

import React, { useEffect, useRef } from "react";
import { useIntersection } from 'react-use';
import { ProductCard } from "./ProductCard";
import { useCategoryStore } from "../../../store/category";
import { Title } from "./Title";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId, className, listClassName }) => {
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  useEffect(() => {
    if (intersection?.isIntersecting) setActiveCategoryId(categoryId);

  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => <ProductCard key={product.id} id={product.id} name={product.name} imageUrl={product.imageUrl} price={product.items[0].price} />)}
      </div>
    </div>
  )
}