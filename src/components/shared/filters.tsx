'use client';

import React, { FC } from 'react';
import { useFilters, useIngredients, useQueryFilters  } from '../../../hooks';
import { Title } from './Title';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';

interface Props {
  className?: string;
}

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

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