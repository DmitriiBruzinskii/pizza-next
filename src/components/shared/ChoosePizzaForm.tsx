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
  ingredients: Ingredient[];
  className?: string;
};

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  ingredients,
  items,
  className
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = pizzaPrice + totalIngredientsPrice;

  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  const availableTypes = items.filter((item) => item.pizzaType === type);
  const availableSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availableTypes.some((pizza) => Number(pizza.size) === Number(item.value))
  }));

  useEffect(() => {
    const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) setSize(Number(availableSize.value) as PizzaSize);
  }, [type]);

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

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {
              ingredients.map((ingredient) => (
                <IngredientItem 
                  key={ingredient.id}
                  name={ingredient.name} 
                  imageUrl={ingredient.imageUrl} 
                  price={ingredient.price} 
                  onClick={() => addIngredient(ingredient.id)}
                  active={selectedIngredients.has(ingredient.id)}
                />
            ))}
          </div>
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}