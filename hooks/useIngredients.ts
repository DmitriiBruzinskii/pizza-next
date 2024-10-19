import { useEffect, useState } from "react";
import { Api } from "../services/apiClients";
import { Ingredient } from "@prisma/client";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useIngredients = (): ReturnProps => {
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