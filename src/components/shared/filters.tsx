'use client';

import React, { FC } from 'react';
import { useFilters, useIngredients, useQueryFilters  } from '../../../hooks';
import { Title } from './Title';
import { Input, RangeSlider } from '../ui';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('min', prices[0])
    filters.setPrices('max', prices[1])
  };

  return (
    <div className={className}>
      <Title text='Фильтрация' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        title='Тип теста'
        name='pizzaTypes'
        className='mb-5'
        selected={filters.pizzaTypes}
        onClickCheckbox={filters.setToggleTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title='Размеры'
        name='sizes'
        className='mb-5'
        selected={filters.pizzaSizes}
        onClickCheckbox={filters.setPizzaSizes}
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
            value={String(filters.prices.min)} 
            onChange={(e) => filters.setPrices('min', Number(e.target.value))} 
          />
          <Input 
            type='number' 
            placeholder='1000' 
            min={100} 
            max={1000} 
            value={filters.prices.max > 1000 ? '1000' : String(filters.prices.max)} 
            onChange={(e) => filters.setPrices('max', Math.min(Number(e.target.value), 1000))} 
          /> 
        </div>
        <RangeSlider 
          min={0} 
          max={1000} 
          step={10} 
          value={[filters.prices.min, filters.prices.max]} 
          onValueChange={updatePrices} 
        />
      </div>

      <CheckboxFiltersGroup
        className='mt-5'
        title='Ингредиенты'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={loading}
        onClickCheckbox={filters.setToggleIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  )
}