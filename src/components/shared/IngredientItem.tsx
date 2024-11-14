import React from "react"
import { cn } from "@/lib/utils";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  price,
  name,
  imageUrl,
  onClick,
  className
}) => {
  return (
    <div
      className={cn(
        className,
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        { 'border border-primary': active }
      )}
      onClick={onClick}>
      <img width={110} height={110} src={imageUrl} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  )
}