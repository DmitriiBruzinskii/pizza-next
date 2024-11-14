import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSet } from "react-use";
import { Ingredient, ProductItem } from "@prisma/client";
import { Button } from "../ui";
import { Title } from "./Title";
import { PizzaImage } from "./PizzaImage";
import { GroupVariants } from "./GroupVariants";
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/constants/pizza";
import { IngredientItem } from "./IngredientItem";

interface Props {
  name: string,
  items: ProductItem[];
  imageUrl: string;
  className?: string;
};

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  items,
  className
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;
  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f6f5f3] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-1 mt-5">
          <GroupVariants items={availableSizes} value={String(size)} onClick={(value) => setSize(Number(value) as PizzaSize)} />
          <GroupVariants items={pizzaTypes} value={String(type)} onClick={(value) => setType(Number(value) as PizzaType)} />
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за 300 ₽
        </Button>
      </div>
    </div>
  )
}