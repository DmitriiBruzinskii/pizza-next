'use client';

import React from 'react';
import { useFilterIngredients } from '../../../hooks/useFilterIngredients';
import { Title } from './Title';
import { Input, RangeSlider } from '../ui';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useFilterIngredients();

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input type='number' placeholder='0' min={0} max={30000} defaultValue={0} />
          <Input type='number' min={100} max={30000} placeholder='30000' />
        </div>
        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>

      <CheckboxFiltersGroup
        className='mt-5'
        title='Ингредиенты'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
      />
    </div>
  )
}