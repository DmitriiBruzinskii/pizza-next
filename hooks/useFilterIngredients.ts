import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import { Api } from '../services/apiClients';

interface ReturnProps {
  ingredients: Ingredient[];
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    Api.ingredients
      .getAll()
      .then(ingredients => setIngredients(ingredients))
      .catch(error => console.log(error));
  }, []);

  return { ingredients };
}