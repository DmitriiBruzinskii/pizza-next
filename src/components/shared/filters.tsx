'use client';

import React, { FC, useState } from 'react';
import { useFilterIngredients } from '../../../hooks/useFilterIngredients';
import { Title } from './Title';
import { Input, RangeSlider } from '../ui';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';
import { useSet } from 'react-use';

interface Props {
  className?: string;
}

interface PriceProps {
  min: number;
  max: number;
}

export const Filters: FC<Props> = ({ className }) => {
  const [price, setPrice] = useState<PriceProps>({ min: 0, max: 1000 });

  const updatePrice = (name: keyof PriceProps, value: number) => setPrice({ ...price, [name]: value });

  const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients();

  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
  const [types, { toggle: toggleTypes }] = useSet(new Set<string>([]));

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        title='Тип теста'
        name='pizzaTypes'
        className='mb-5'
        selected={types}
        onClickCheckbox={toggleTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title='Размеры'
        name='sizes'
        className='mb-5'
        selected={sizes}
        onClickCheckbox={toggleSizes}
        items={[
          { text: '20см', value: '20' },
          { text: '30см', value: '30' },
          { text: '40см', value: '40' }
        ]}
      />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Цена от и до:</p>
        <div className='flex gap-3 mb-5'>
          <Input 
            type='number' 
            placeholder='0' 
            min={0} 
            max={1000} 
            value={String(price.min)} 
            onChange={(e) => updatePrice('min', Number(e.target.value))} 
          />
          <Input 
            type='number' 
            placeholder='1000' 
            min={100} 
            max={1000} 
            value={price.max > 1000 ? '1000' : String(price.max)} 
            onChange={(e) => updatePrice('max', Math.min(Number(e.target.value), 1000))} 
          /> 
        </div>
        <RangeSlider 
          min={0} 
          max={1000} 
          step={10} 
          value={[price.min, price.max]} 
          onValueChange={([min, max]) => setPrice({min, max})} 
        />
      </div>

      <CheckboxFiltersGroup
        className='mt-5'
        title='Ингредиенты'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        selected={selectedIds}
        onClickCheckbox={onAddId}
      />
    </div>
  )
}