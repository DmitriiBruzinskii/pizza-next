import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';

interface PriceProps {
  min: number;
  max: number;
}

export interface Filters {
  selectedIngredients: Set<string>;
  pizzaSizes: Set<string>;
  pizzaTypes: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
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
  const [prices, setPrices] = useState<PriceProps>({ 
    min: Number(searchParams.get('min')), 
    max: Number(searchParams.get('max')) 
  });

  const updatePrice = (name: keyof PriceProps, value: number) => setPrices(prev => ({...prev, [name]: value }));


  return {
    selectedIngredients,
    pizzaSizes,
    pizzaTypes,
    prices,
    setPrices: updatePrice,
    setToggleIngredients: toggleIngredients,
    setPizzaSizes: toggleSizes,
    setToggleTypes: toggleTypes
  }
}