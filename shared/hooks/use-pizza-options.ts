import React from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvaliablePizzaSizes } from "../lib";
import {  ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  selectedIngredients:Set<number>;
  addIngredient: (id:number) => void;
  avaliableSizes: Variant[];
  currentItemId?: number; 
}
export const usePizzaOptions = (items:ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([]),
  );
  const avaliableSizes = getAvaliablePizzaSizes (type, items);

  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

  React.useEffect(() => {
    const isAvaliableSize = avaliableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const avaliableSize = avaliableSizes?.find((item) => !item.disabled);

    if (!isAvaliableSize && avaliableSize) {
      setSize(Number(avaliableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    addIngredient,
    avaliableSizes,
    currentItemId
  }
};
