import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import React from 'react';

interface Props {
  orderId: number;
}

export const OrderCancelledTemplate: React.FC<Props> = ({ orderId }) => (
  <div>
    <h1>К сожалению, оплата не прошла</h1>

    <p>Ваш заказ #{orderId} не был оплачен. </p>

  </div>
);
