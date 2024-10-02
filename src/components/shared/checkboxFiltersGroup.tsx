'use client';

import React, { useState } from 'react';
import { FilterCheckbox, FilterChecboxProps } from './FilterCheckbox';
import { Input, Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  loading?: boolean;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  className,
  loading,
  onChange,
  defaultValue,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const list = showAll ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())) : defaultItems.slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  if (loading) {
    return (
      <div className={className}>
        <p className='font-bold mb-3'>{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className='h-6 mb-4 rounded-[6px]' />)
        }
      </div>
    )
  }

  return (
    <div className={className}>
      <p className='font-bold mb-3'>{title}</p>
      {showAll && (
        <div className='mb-5'>
          <Input onChange={onChangeSearchInput} placeholder={searchInputPlaceholder} className='bg-gray-50 border-none' />
        </div>
      )}
      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
         {list.map((item, index) => <FilterCheckbox key={index} value={item.value} text={item.text} endAdornment={item.endAdornment} />)}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};