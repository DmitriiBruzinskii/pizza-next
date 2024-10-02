import { useEffect, useState } from 'react';
import { Ingredient } from '@prisma/client';
import { Api } from '../services/apiClients';

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    Api.ingredients
      .getAll()
      .then((ingredients) => setIngredients(ingredients))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return { ingredients, loading };
}