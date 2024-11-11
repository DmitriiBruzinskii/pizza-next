import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';

export interface Filters {
  selectedIngredients: Set<string>;
  pizzaSizes: Set<string>;
  pizzaTypes: Set<string>;
}

interface ReturnProps extends Filters {
  setToggleIngredients: (value: string) => void;
  setPizzaSizes: (value: string) => void;
  setToggleTypes: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();
  
  const initializeSet = (arg: string) => useSet(new Set<string>(searchParams.get(arg)?.split(',') || []));

  const [selectedIngredients, { toggle: toggleIngredients }] = initializeSet('ingredients');
  const [pizzaSizes, { toggle: toggleSizes }] = initializeSet('pizzaSizes');
  const [pizzaTypes, { toggle: toggleTypes }] = initializeSet('pizzaTypes');

  return useMemo(
    () => ({
      pizzaSizes,
      pizzaTypes,
      selectedIngredients,
      setToggleTypes: toggleTypes,
      setPizzaSizes: toggleSizes,
      setToggleIngredients: toggleIngredients,
    }),
    [pizzaSizes, pizzaTypes, selectedIngredients],
  );
};
