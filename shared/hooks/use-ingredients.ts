import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () =>{
     const [ingredients, setingredients] = React.useState<Ingredient[]>([]);
      const [loading, setLoading] = React.useState(true);
      
      React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setingredients(ingredients);
      } catch (eror) {
        console.log(eror);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

    return {
    ingredients,
    loading,
    
  };
}