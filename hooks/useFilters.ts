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
  
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',') || []));
  const [pizzaSizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get('pizzaSizes')?.split(',') || []));
  const [pizzaTypes, { toggle: toggleTypes }] = useSet(new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []));
  const [prices, setPrices] = useState<PriceProps>({ 
    min: Number(searchParams.get('min')), 
    max: Number(searchParams.get('max')) 
  });

  const updatePrice = (name: keyof PriceProps, value: number) => setPrices({ ...prices, [name]: value });


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