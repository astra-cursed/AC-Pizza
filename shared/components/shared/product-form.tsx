'use client';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store/cart';
import React from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
    product: ProductWithRelations;
className?: string ;
onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ className, product, onSubmit: _onSubmit  }) => {
     const isPizzaForm = Boolean(product.items[0].pizzaType);
  const firstItem = product.items[0];
   const loading = useCartStore((state) => state.loading);
    const addCartItem = useCartStore((state) => state.addCartItem);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + " добавлен в корзину!");

      _onSubmit?.();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину :(");
      console.error(error);
    }
  };

  if(isPizzaForm) {
    return (<ChoosePizzaForm
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients}
              items={product.items}
              onSubmit={onSubmit}
              loading={loading}
            />
    );
  }
 return ( <ChooseProductForm
           loading={loading}
           imageUrl={product.imageUrl}
           price={firstItem.price}
           name={product.name}
           onSubmit={onSubmit}
         />
 );
};
