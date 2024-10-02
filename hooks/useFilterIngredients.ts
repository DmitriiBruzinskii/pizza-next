import { useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { Ingredient } from '@prisma/client';
import { Api } from '../services/apiClients';

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedIds, { toggle }] = useSet(new Set<string>([]));

  useEffect(() => {
    setLoading(true);
    
    Api.ingredients
      .getAll()
      .then((ingredients) => setIngredients(ingredients))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return { ingredients, loading, onAddId: toggle, selectedIds };
}