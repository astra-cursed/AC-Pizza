'use client';

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="fa0705ed9b44f1521a9cb3681dd42bc3fd1ca0cd"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
