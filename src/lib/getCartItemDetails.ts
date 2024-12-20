import { PizzaSize, PizzaType, mapPizzaType } from '../constants/pizza';
import { CartStateItem } from './getCartDetails';

export const getCartItemDetails = (
  ingredients: CartStateItem['ingredients'],
  pizzaType?: PizzaType,
  pizzaSize?: PizzaSize,
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];

    details.push(`${typeName} ${pizzaSize} см`);
  };

  if (ingredients) details.push(...ingredients.map((ingredient) => ingredient.name));

  return details.join(', ');
};