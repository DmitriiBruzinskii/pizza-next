import { calcPizzaPrice } from './calcPizzaPrice';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType, mapPizzaType } from '../constants/pizza';

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcPizzaPrice(type, size, items, ingredients, selectedIngredients);
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

  return { totalPrice, textDetails };
};